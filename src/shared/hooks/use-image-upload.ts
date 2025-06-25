import { useCallback } from 'react';

import type { UploadedImage } from '../types/uploaded-image';

export const useImageUpload = (
  images: UploadedImage[] = [],
  setImages: (images: UploadedImage[]) => void
) => {
  const addImages = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/')
      );
      const imagesToAdd = imageFiles.map(
        (file) =>
          new Promise<UploadedImage>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({ file, preview: reader.result as string });
            };
            reader.readAsDataURL(file);
          })
      );
      const newImages = await Promise.all(imagesToAdd);
      setImages([...images, ...newImages]);
    },
    [images, setImages]
  );

  const removeImage = useCallback(
    (index: number) => {
      setImages(images.filter((_, i) => i !== index));
    },
    [images, setImages]
  );

  return { addImages, removeImage, images };
};
