import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { ObjectValues } from '@/shared/types/object-values';

import type { STEPS } from '../constants/custom-react-form';
import { buildFormSchema, type formValues } from '../form.schema';

type Step = ObjectValues<typeof STEPS>;
type Animation = 'animate-fade-in-right' | 'animate-fade-in-left';

export const useCustomReactForm = ({ hostRef }: { hostRef: HTMLElement }) => {
  const [step, setStep] = useState<Step>(1);
  const [animation, setAnimation] = useState<Animation>(
    'animate-fade-in-right'
  );
  const { t } = useTranslation(['custom-react-form']);
  const schema = useMemo(() => buildFormSchema(t), [t]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      accommodation: { address: '', name: '', description: '' },
      owner: { name: '', email: '', phone: '' },
    },
    context: { hostRef },
  });

  const { trigger, handleSubmit } = form;

  const handleNext = async () => {
    const fieldsToValidate: Partial<Record<Step, (keyof formValues)[]>> = {
      1: ['accommodation'],
      2: ['owner'],
    };

    const isValid = await trigger(fieldsToValidate[step]);
    if (!isValid) return;

    setStep((step + 1) as Step);
    setAnimation('animate-fade-in-left');
  };

  const handleBack = () => {
    setStep((step - 1) as Step);
    setAnimation('animate-fade-in-right');
  };

  const onSubmit = (data: formValues) => {
    const event = new CustomEvent('custom-react-submit', { detail: data });
    hostRef.dispatchEvent(event);
    const randomSuccessFailureMessage =
      Math.random() > 0.5
        ? 'Form submitted successfully!'
        : 'Form submission failed. Please try again.';

    alert(randomSuccessFailureMessage);
  };

  return {
    step,
    form,
    animation,
    handleNext,
    handleBack,
    handleSubmit: handleSubmit(onSubmit),
  };
};
