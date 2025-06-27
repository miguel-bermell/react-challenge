import { Form } from '@components/ui/form';

import { STEPS } from '@/features/custom-react-form/constants/custom-react-form';

import { useCustomReactForm } from './hooks/use-custom-react-form';
import { Accommodation } from './steps/accommodation';
import { Owner } from './steps/owner';
import { Summary } from './steps/summary';

export const CustomReactForm = ({ hostRef }: { hostRef: HTMLElement }) => {
  const { step, form, animation, handleNext, handleBack, handleSubmit } =
    useCustomReactForm({ hostRef });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col min-h-[600px]">
          {step === STEPS.ACCOMMODATION && (
            <Accommodation
              form={form}
              onNext={handleNext}
              className={animation}
            />
          )}
          {step === STEPS.OWNER && (
            <Owner
              form={form}
              onNext={handleNext}
              onBack={handleBack}
              className={animation}
            />
          )}
          {step === STEPS.SUMMARY && (
            <Summary form={form} onBack={handleBack} className={animation} />
          )}
        </div>
      </form>
    </Form>
  );
};
