import { Button } from '@components/ui/button';
import { LabelInLine } from '@components/ui/label-inline';
import type { UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Title } from '../components/title';
import type { formValues } from '../form.schema';

export const Summary = ({
  form,
  onBack,
  className,
}: {
  form: UseFormReturn<formValues>;
  onBack: () => void;
  className?: string;
}) => {
  const { accommodation, owner } = form.getValues();

  return (
    <div className={cn('flex flex-col flex-1 space-y-4', className)}>
      <fieldset className="space-y-2 flex-1/2">
        <Title>Accommodation</Title>
        <LabelInLine label="Name">{accommodation.name}</LabelInLine>
        <LabelInLine label="Address">{accommodation.address}</LabelInLine>
        <LabelInLine label="Description">
          {accommodation.description}
        </LabelInLine>
        <LabelInLine label="Type">{accommodation.type}</LabelInLine>
        {accommodation.photos?.length ? (
          <>
            <p className="font-semibold">Photos:</p>
            <div className="flex gap-2">
              {accommodation.photos.map((photo, index) => (
                <img
                  key={`${photo.file.name}-${index}`}
                  src={photo.preview}
                  alt={`Photo ${photo.file.name}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </>
        ) : null}
      </fieldset>
      <fieldset className="space-y-2 flex-1/2">
        <Title>Owner</Title>
        <LabelInLine label="Name">{owner.name}</LabelInLine>
        <LabelInLine label="Email">{owner.email}</LabelInLine>
        <LabelInLine label="Phone">{owner.phone}</LabelInLine>
      </fieldset>
      <div className="flex gap-5 justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
};
