import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { OnboardingForm } from "@/app/onboarding/OnboardingForm/OnboardingForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function OnboardingPage() {
  const user = await currentUser();

  if (user?.privateMetadata["userId"]) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to WealthFlow</CardTitle>
          <CardDescription>Let&apos;s set up your account.</CardDescription>
        </CardHeader>

        <OnboardingForm />
      </Card>
    </div>
  );
}
