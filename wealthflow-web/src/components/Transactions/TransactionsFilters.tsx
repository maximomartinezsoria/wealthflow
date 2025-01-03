import { Loader2 } from "lucide-react";
import { useState } from "react";

import { getTransactions } from "@/app/dashboard/actions";
import { TransactionsFilter } from "@/components/Transactions/TransactionsFilter";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { TransactionType, transactionTypes, useStore } from "@/lib/store";

export function TransactionsFilters() {
  const { balances, setTransactions } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  const [filterBalance, setFilterBalance] = useState("all");
  const [filterType, setFilterType] = useState<TransactionType | "all">("all");
  const [filterDateFrom, setFilterDateFrom] = useState<Date | undefined>(
    undefined,
  );
  const [filterDateTo, setFilterDateTo] = useState<Date | undefined>(undefined);

  const handleFilter = async () => {
    setIsLoading(true);

    const filteredTransactions = await getTransactions({
      balanceId: filterBalance === "all" ? undefined : filterBalance,
      transactionType: filterType === "all" ? undefined : filterType,
      fromDate: filterDateFrom,
      toDate: filterDateTo,
    });

    setTransactions(filteredTransactions);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <TransactionsFilter
        id="filter-balance"
        label="Filter by Balance"
        placeholder="All Balances"
        onChange={setFilterBalance}
        filterType="select"
      >
        <SelectItem value="all">All Balances</SelectItem>
        {balances.map((balance) => (
          <SelectItem key={balance.id} value={balance.id}>
            {balance.name}
          </SelectItem>
        ))}
      </TransactionsFilter>

      <TransactionsFilter
        id="filter-type"
        label="Filter by Type"
        placeholder="All Types"
        onChange={(newValue) => {
          setFilterType(newValue as TransactionType);
        }}
        filterType="select"
      >
        <SelectItem value="all">All Types</SelectItem>
        {transactionTypes.map(({ key, value }) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </TransactionsFilter>

      <TransactionsFilter
        id="filter-date-from"
        label="From Date"
        placeholder="All Dates"
        onChange={(newValue) => {
          setFilterDateFrom(new Date(newValue));
        }}
        filterType="date"
      />

      <TransactionsFilter
        id="filter-date-to"
        label="To Date"
        placeholder="All Dates"
        onChange={(newValue) => {
          setFilterDateTo(new Date(newValue));
        }}
        filterType="date"
      />

      <Button onClick={handleFilter} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Filter"
        )}
      </Button>
    </div>
  );
}
