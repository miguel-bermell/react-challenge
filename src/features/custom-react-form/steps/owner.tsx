import { Button } from '@components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import type { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Title } from '../components/title';
import type { formValues } from '../form.schema';

export const Owner = ({
  form,
  onNext,
  onBack,
  className,
}: {
  form: UseFormReturn<formValues>;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}) => {
  const { t } = useTranslation(['custom-react-form']);
  return (
    <div
      data-testid="step-owner"
      className={cn('flex flex-col flex-1', className)}
    >
      <fieldset className="space-y-4 flex-1">
        <Title>{t('steps.owner.title')}</Title>
        <FormField
          control={form.control}
          name="owner.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.owner.form.name')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('steps.owner.form.namePlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.owner.form.email')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('steps.owner.form.email')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.owner.form.phone')}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t('steps.owner.form.phonePlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>
      <div className="flex gap-5 justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          {t('buttons.back')}
        </Button>
        <Button type="button" onClick={onNext}>
          {t('buttons.next')}
        </Button>
      </div>
    </div>
  );
};
