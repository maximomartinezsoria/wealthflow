import { NewTransactionsDialog } from "@/components/Transactions/NewTransactionsDialog";
import { TransactionsFilters } from "@/components/Transactions/TransactionsFilters";
import { TransactionsTable } from "@/components/Transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Transactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
        <NewTransactionsDialog />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TransactionsFilters />
          <TransactionsTable />
        </div>
      </CardContent>
    </Card>
  );
}
