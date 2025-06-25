import { useRef } from 'react';

import { useImageUpload } from '../hooks/use-image-upload';
import type { UploadedImage } from '../types/uploaded-image';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
  value: UploadedImage[];
  onChange: (imgs: UploadedImage[]) => void;
  max?: number;
}

export const ImagesUploader = ({ value, onChange, max = 2 }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addImages, removeImage } = useImageUpload(value, onChange);

  return (
    <div className="flex gap-4 mt-2">
      {value.map((img, index) => (
        <div
          key={`${img.file.name}-${index}`}
          className={
            'w-28 h-28 rounded border flex items-center justify-center text-center text-sm relative'
          }
        >
          <img
            src={img.preview}
            alt={img.file.name}
            className="object-cover w-full h-full rounded"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 w-5 h-5 p-0 m-0 rounded-full"
          >
            ×
          </Button>
        </div>
      ))}
      {value.length < max && (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-28 h-28 rounded border text-center text-sm"
        >
          Add Photo
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              addImages(e.target.files);
              e.target.value = '';
            }}
          />
        </Button>
      )}
    </div>
  );
};
