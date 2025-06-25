import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ObjectValues } from '@/shared/types/object-values';

import type { STEPS } from '../constants/custom-react-form';
import { formSchema, type formValues } from '../form.schema';

type Step = ObjectValues<typeof STEPS>;
type Animation = 'animate-fade-in-right' | 'animate-fade-in-left';

export const useCustomReactForm = ({ hostRef }: { hostRef: HTMLElement }) => {
  const [step, setStep] = useState<Step>(1);
  const [animation, setAnimation] = useState<Animation>(
    'animate-fade-in-right'
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      accommodation: { address: '', name: '', description: '' },
      owner: { name: '', email: '', phone: '' },
    },
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
