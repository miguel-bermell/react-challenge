import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  ACCOMMODATION_TYPE,
  MAX_PHOTO_HEIGHT,
  MAX_PHOTO_WIDTH,
} from './constants/custom-react-form';

const buildAccommodationSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(4, {
        message: t('errors.minLength', {
          field: t('steps.accommodation.form.name'),
          min: 4,
        }),
      })
      .max(128, {
        message: t('errors.maxLength', {
          field: t('steps.accommodation.form.name'),
          max: 128,
        }),
      })
      .regex(/^[a-zA-Z\s]+$/, { message: t('errors.nameRegex') }),
    address: z
      .string()
      .min(4, {
        message: t('errors.minLength', {
          field: t('steps.accommodation.form.address'),
          min: 4,
        }),
      })
      .max(128, {
        message: t('errors.maxLength', {
          field: t('steps.accommodation.form.address'),
          max: 128,
        }),
      })
      .regex(/^[a-zA-Z\s]+$/, { message: t('errors.nameRegex') }),
    description: z
      .string()
      .min(128, {
        message: t('errors.minLength', {
          field: t('steps.accommodation.form.description'),
          min: 128,
        }),
      })
      .max(2048, {
        message: t('errors.maxLength', {
          field: t('steps.accommodation.form.description'),
          max: 2048,
        }),
      })
      .optional()
      .or(z.literal('')),
    type: z.nativeEnum(ACCOMMODATION_TYPE, {
      errorMap: () => ({
        message: t('errors.required', {
          field: t('steps.accommodation.form.type'),
        }),
      }),
    }),
    photos: z
      .array(z.object({ file: z.instanceof(File), preview: z.string() }))
      .max(2, { message: t('errors.maxPhotos', { max: 2 }) })
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
          message: t('errors.photoSize', {
            width: MAX_PHOTO_WIDTH,
            height: MAX_PHOTO_HEIGHT,
          }),
        }
      ),
  });

const buildOwnerSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(4, {
        message: t('errors.minLength', {
          field: t('steps.owner.form.name'),
          min: 4,
        }),
      })
      .max(64, {
        message: t('errors.maxLength', {
          field: t('steps.owner.form.name'),
          max: 64,
        }),
      }),
    email: z.string().email({ message: t('errors.invalidEmail') }),
    phone: z
      .union([
        z.literal(''),
        z.string().regex(/^\d{0,9}$/, {
          message: t('errors.invalidPhone'),
        }),
      ])
      .optional(),
  });

export const buildFormSchema = (t: TFunction) =>
  z.object({
    accommodation: buildAccommodationSchema(t),
    owner: buildOwnerSchema(t),
  });

export type formValues = z.infer<ReturnType<typeof buildFormSchema>>;
