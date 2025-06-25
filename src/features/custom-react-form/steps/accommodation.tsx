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
}) => (
  <div className={cn('flex flex-col flex-1', className)}>
    <fieldset className="flex-1 space-y-4">
      <Title>Accommodation</Title>
      <FormField
        control={form.control}
        name="accommodation.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Accommodation name" {...field} />
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
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Address" {...field} />
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                className="max-h-40"
                placeholder="Accommodation description"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-xs">
              Optional. Min 128, max 2048 characters.
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
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="house">House</SelectItem>
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
            <FormLabel>Photos</FormLabel>
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
        Next
      </Button>
    </div>
  </div>
);
