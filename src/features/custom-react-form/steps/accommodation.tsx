import { Button } from '@components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';
import { type UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { ImagesUploader } from '@/shared/components/images-uploader';

import { Title } from '../components/title';
import type { formValues } from '../form.schema';

export const Accommodation = ({
  form,
  onNext,
  className,
}: {
  form: UseFormReturn<formValues>;
  onNext: () => void;
  className?: string;
}) => {
  const { t } = useTranslation(['custom-react-form']);

  return (
    <div className={cn('flex flex-col flex-1', className)}>
      <fieldset className="flex-1 space-y-4">
        <Title>{t('steps.accommodation.title')}</Title>
        <FormField
          control={form.control}
          name="accommodation.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.accommodation.form.name')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('steps.accommodation.form.namePlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accommodation.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.accommodation.form.address')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('steps.accommodation.form.address')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accommodation.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.accommodation.form.description')}</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-40"
                  placeholder={t(
                    'steps.accommodation.form.descriptionPlaceholder'
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                {t('steps.accommodation.form.descriptionHint', {
                  min: 128,
                  max: 2048,
                })}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accommodation.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.accommodation.form.type')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={t(
                        'steps.accommodation.form.typePlaceholder'
                      )}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apartment">
                      {t('steps.accommodation.form.typeOptions.apartment')}
                    </SelectItem>
                    <SelectItem value="villa">
                      {t('steps.accommodation.form.typeOptions.villa')}
                    </SelectItem>
                    <SelectItem value="house">
                      {t('steps.accommodation.form.typeOptions.house')}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accommodation.photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('steps.accommodation.form.photos')}</FormLabel>
              <ImagesUploader
                value={field.value ?? []}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>
      <div className="flex gap-2 justify-end">
        <Button type="button" onClick={onNext}>
          {t('buttons.next')}
        </Button>
      </div>
    </div>
  );
};
