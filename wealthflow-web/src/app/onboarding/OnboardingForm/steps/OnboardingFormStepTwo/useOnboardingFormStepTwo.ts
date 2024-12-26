import { createBalances } from "@/app/onboarding/OnboardingForm/steps/OnboardingFormStepTwo/actions";
import { useStore } from "@/lib/store";

export function useOnboardingFormStepTwo() {
  const { balances } = useStore();

  const handleSubmit = async () => {
    const { errors } = await createBalances(balances);

    if (errors) {
      throw new Error(errors[0].message);
    }
  };

  return {
    handleSubmit,
  };
}
