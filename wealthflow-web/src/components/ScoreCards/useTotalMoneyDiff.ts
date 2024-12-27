type Props = {
  totalMoney: number;
  lastMonthTotalMoney: number;
};

export function useTotalMoneyDiff({ totalMoney, lastMonthTotalMoney }: Props) {
  const diffFromLastMonth = totalMoney - lastMonthTotalMoney;
  const diffFromLastMonthPercentage =
    diffFromLastMonth === 0
      ? 0
      : Math.abs((diffFromLastMonth / lastMonthTotalMoney) * 100).toFixed(2);

  const diffFromLastMonthSign =
    diffFromLastMonth > 0 ? "+" : diffFromLastMonth < 0 ? "-" : "";

  return {
    diffFromLastMonth,
    diffFromLastMonthPercentage,
    diffFromLastMonthSign,
  };
}
