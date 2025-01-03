import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getBalances, getTransactions, getUser } from "@/app/dashboard/actions";
import { ClientHydrator } from "@/app/dashboard/ClientHydrator";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();
  const userId = clerkUser?.privateMetadata["userId"];
  if (!userId) {
    redirect("/onboarding");
  }

  const [user, balances, transactions] = await Promise.all([
    getUser(),
    getBalances(),
    getTransactions({}),
  ]);

  return (
    <div>
      <ClientHydrator
        user={user}
        balances={balances}
        transactions={transactions}
      />
      {children}
    </div>
  );
}
