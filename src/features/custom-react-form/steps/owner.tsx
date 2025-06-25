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
}) => (
  <div className={cn('flex flex-col flex-1', className)}>
    <fieldset className="space-y-4 flex-1">
      <Title>Owner</Title>
      <FormField
        control={form.control}
        name="owner.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Owner name" {...field} />
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
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} />
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
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="Phone (optional)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
    <div className="flex gap-5 justify-end">
      <Button type="button" variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);
