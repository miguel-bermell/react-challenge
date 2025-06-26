import { Button } from '@components/ui/button';
import { LabelInLine } from '@components/ui/label-inline';
import type { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['custom-react-form']);

  return (
    <div className={cn('flex flex-col flex-1 space-y-4', className)}>
      <fieldset className="space-y-2 flex-1/2">
        <Title>{t('steps.accommodation.title')}</Title>
        <LabelInLine label={t('steps.accommodation.form.name')}>
          {accommodation.name}
        </LabelInLine>
        <LabelInLine label={t('steps.accommodation.form.address')}>
          {accommodation.address}
        </LabelInLine>
        <LabelInLine label={t('steps.accommodation.form.description')}>
          {accommodation.description}
        </LabelInLine>
        <LabelInLine label="Type">{accommodation.type}</LabelInLine>
        {accommodation.photos?.length ? (
          <>
            <p className="font-semibold">
              {t('steps.accommodation.form.photos')}:
            </p>
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
        <Title>{t('steps.owner.title')}</Title>
        <LabelInLine label={t('steps.owner.form.name')}>
          {owner.name}
        </LabelInLine>
        <LabelInLine label={t('steps.owner.form.email')}>
          {owner.email}
        </LabelInLine>
        <LabelInLine label={t('steps.owner.form.phone')}>
          {owner.phone}
        </LabelInLine>
      </fieldset>
      <div className="flex gap-5 justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          {t('buttons.back')}
        </Button>
        <Button type="submit">{t('buttons.submit')}</Button>
      </div>
    </div>
  );
};
