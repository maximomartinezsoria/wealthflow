import { redirect } from "next/navigation";

import { getUser } from "@/app/dashboard/actions";
import { ClientHydrator } from "@/app/dashboard/ClientHydrator";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/onboarding");
  }

  return (
    <div>
      <ClientHydrator user={user} />
      {children}
    </div>
  );
}
