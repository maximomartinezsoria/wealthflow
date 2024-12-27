import clsx from "clsx";
import { CreditCard, DollarSign, Target } from "lucide-react";

import { ScoreCard } from "@/components/ScoreCards/ScoreCard";
import { useTotalMoneyDiff } from "@/components/ScoreCards/useTotalMoneyDiff";
import { useStore } from "@/lib/store";

export function ScoreCards() {
  const { user } = useStore();
  const {
    diffFromLastMonth,
    diffFromLastMonthPercentage,
    diffFromLastMonthSign,
  } = useTotalMoneyDiff({
    totalMoney: user.totalMoney,
    lastMonthTotalMoney: user.lastMonthTotalMoney,
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <ScoreCard
        title="Total Balance"
        number={user.totalMoney.toFixed(2)}
        note={`${diffFromLastMonthSign}${diffFromLastMonthPercentage}% from last month`}
        noteClassNames={clsx({
          "text-green-500": diffFromLastMonth > 0,
          "text-red-500": diffFromLastMonth <= 0,
        })}
        Icon={DollarSign}
      />
      <ScoreCard
        title="Monthly Income"
        number={user.monthlyIncome.toFixed(2)}
        note={`Next payday: ${user.payday}th of the month`}
        Icon={CreditCard}
      />
      {/* TODO: get goals */}
      <ScoreCard
        title="Active Goals"
        number={"0"}
        note={`${0} completed`}
        Icon={Target}
      />
    </div>
  );
}
