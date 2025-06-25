import { z } from 'zod';

import {
  ACCOMMODATION_TYPE,
  MAX_PHOTO_HEIGHT,
  MAX_PHOTO_WIDTH,
} from './constants/custom-react-form';

const accommodationSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long' })
    .max(128, { message: 'Name must be at most 128 characters long' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters',
    }),
  address: z
    .string()
    .min(4, { message: 'Address must be at least 4 characters long' })
    .max(128, { message: 'Address must be at most 128 characters long' }),
  description: z
    .string()
    .min(128, { message: 'Description must be at least 128 characters long' })
    .max(2048, { message: 'Description must be at most 2048 characters long' })
    .optional()
    .or(z.literal('')),
  type: z.nativeEnum(ACCOMMODATION_TYPE, {
    errorMap: () => ({
      message: 'Type is required',
    }),
  }),
  photos: z
    .array(z.object({ file: z.instanceof(File), preview: z.string() }))
    .max(2, { message: 'Max 2 photos' })
    .optional()
    .refine(
      async (photos) => {
        if (!photos || !photos.length) return true;

        const results = await Promise.all(
          photos.map(
            (photo) =>
              new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => {
                  resolve(
                    img.width <= MAX_PHOTO_WIDTH &&
                      img.height <= MAX_PHOTO_HEIGHT
                  );
                };
                img.onerror = () => resolve(false);
                img.src = photo.preview;
              })
          )
        );
        return results.every(Boolean);
      },
      {
        message: `All photos must be at most ${MAX_PHOTO_WIDTH}x${MAX_PHOTO_HEIGHT} pixels`,
      }
    ),
});

const ownerSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long' })
    .max(64, { message: 'Name must be at most 64 characters long' }),
  email: z.string().email({ message: 'Email must be a valid email address' }),
  phone: z
    .union([
      z.literal(''),
      z.string().regex(/^\d{0,9}$/, {
        message: 'Phone number must be up to 9 digits',
      }),
    ])
    .optional(),
});

export const formSchema = z.object({
  accommodation: accommodationSchema,
  owner: ownerSchema,
});
export type formValues = z.infer<typeof formSchema>;
