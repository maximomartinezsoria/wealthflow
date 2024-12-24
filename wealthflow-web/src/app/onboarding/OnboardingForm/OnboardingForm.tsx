"use client";

import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { OnboardingFormStepOne } from "@/app/onboarding/OnboardingForm/steps/OnboardingFormStepOne/OnboardingFormStepOne";
import { useOnboardingFormStepOne } from "@/app/onboarding/OnboardingForm/steps/OnboardingFormStepOne/useOnboardingFormStepOne";
import { OnboardingFormStepTwo } from "@/app/onboarding/OnboardingForm/steps/OnboardingFormStepTwo/OnboardingFormStepTwo";
import { useOnboardingFormStepTwo } from "@/app/onboarding/OnboardingForm/steps/OnboardingFormStepTwo/useOnboardingFormStepTwo";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export function OnboardingForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [hasError, setHasError] = useState(false);

  const { handleSubmit: handleStepOneSubmit } = useOnboardingFormStepOne();
  const { handleSubmit: handleStepTwoSubmit } = useOnboardingFormStepTwo();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      setHasError(false);
      if (step === 1) {
        await handleStepOneSubmit();
        setStep(2);
      } else {
        await handleStepTwoSubmit();
        router.push("/dashboard");
      }
    } catch {
      setHasError(true);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="step1" {...fadeInUp}>
              <OnboardingFormStepOne />
            </motion.div>
          ) : (
            <motion.div key="step2" {...fadeInUp}>
              <OnboardingFormStepTwo />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex-col space-y-6">
        {hasError && (
          <p className="text-red-500">
            Whoops! Something went wrong, please try again later.
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {step === 1 ? "Saving..." : "Finishing..."}
            </>
          ) : step === 1 ? (
            "Next"
          ) : (
            "Finish Setup"
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
