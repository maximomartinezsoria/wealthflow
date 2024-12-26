import { createUser } from "@/app/onboarding/OnboardingForm/steps/OnboardingFormStepOne/actions";
import { useStore } from "@/lib/store";

export function useOnboardingFormStepOne() {
  const { income, payday } = useStore();

  const handleSubmit = async () => {
    const { errors } = await createUser({
      name: "",
      monthlyIncome: income,
      payday,
      totalMoney: 1000,
    });

    if (errors && errors.length) {
      throw new Error(errors[0].message);
    }
  };

  return {
    handleSubmit,
  };
}
