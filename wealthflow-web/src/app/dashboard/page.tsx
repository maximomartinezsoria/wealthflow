"use client";

import { Header } from "@/components/Header";
import { ScoreCards } from "@/components/ScoreCards/ScoreCards";
import { Transactions } from "@/components/Transactions/Transactions";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
  const { isDarkMode } = useStore();

  return (
    <div
      className={`flex flex-col min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}
    >
      <Header />
      <main className="container flex-1 py-6 space-y-4">
        <ScoreCards />
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <BalanceDistribution balances={balances} />
          <IncomeDistribution />
          <FinancialGoals
            goals={goals}
            balances={balances}
            addGoal={addGoal}
            removeGoal={removeGoal}
          />
        </div> */}
        <Transactions />
      </main>
    </div>
  );
}
