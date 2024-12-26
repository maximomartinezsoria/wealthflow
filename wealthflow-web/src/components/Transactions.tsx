import { CreditCard, DollarSign, PlusCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Balance, Goal, Transaction } from "@/lib/store";

interface TransactionsProps {
  transactions: Transaction[];
  balances: Balance[];
  goals: Goal[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  filterBalance: string;
  setFilterBalance: (balance: string) => void;
  sortColumn: keyof Transaction;
  sortDirection: "asc" | "desc";
  handleSortChange: (column: keyof Transaction) => void;
}

export function Transactions({
  transactions,
  balances,
  goals,
  addTransaction,
  filterBalance,
  setFilterBalance,
  sortColumn,
  sortDirection,
  handleSortChange,
}: TransactionsProps) {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"in" | "out">("in");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionBalance, setTransactionBalance] = useState("");
  const [transactionGoal, setTransactionGoal] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");

  const handleAddTransaction = () => {
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) return;

    const newTransaction = {
      date: new Date().toISOString().split("T")[0],
      description: transactionDescription,
      amount,
      type: transactionType,
      balance: transactionBalance,
      goal: transactionGoal || undefined,
    };

    addTransaction(newTransaction);
    setIsNewTransactionOpen(false);
    setTransactionType("in");
    setTransactionAmount("");
    setTransactionBalance("");
    setTransactionGoal("");
    setTransactionDescription("");
  };

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={filterBalance} onValueChange={setFilterBalance}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by balance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-balances">All Balances</SelectItem>
              {balances.map((balance) => (
                <SelectItem key={balance.name} value={balance.name}>
                  {balance.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog
            open={isNewTransactionOpen}
            onOpenChange={setIsNewTransactionOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Enter the details of your new transaction here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={transactionType}
                    onValueChange={(value: "in" | "out") =>
                      setTransactionType(value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">Money In</SelectItem>
                      <SelectItem value="out">Money Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={transactionDescription}
                    onChange={(e) => setTransactionDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="balance" className="text-right">
                    Balance
                  </Label>
                  <Select
                    value={transactionBalance}
                    onValueChange={setTransactionBalance}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select balance" />
                    </SelectTrigger>
                    <SelectContent>
                      {balances.map((balance) => (
                        <SelectItem key={balance.name} value={balance.name}>
                          {balance.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal" className="text-right">
                    Goal (Optional)
                  </Label>
                  <Select
                    value={transactionGoal}
                    onValueChange={setTransactionGoal}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no_goal">No Goal</SelectItem>
                      {goals
                        .filter((goal) => goal.balance === transactionBalance)
                        .map((goal) => (
                          <SelectItem key={goal.name} value={goal.name}>
                            {goal.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddTransaction}>
                  Add Transaction
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSortChange("date")}
              >
                Date{" "}
                {sortColumn === "date" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSortChange("description")}
              >
                Description{" "}
                {sortColumn === "description" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSortChange("amount")}
              >
                Amount{" "}
                {sortColumn === "amount" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSortChange("balance")}
              >
                Balance{" "}
                {sortColumn === "balance" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Goal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {transaction.type === "in" ? (
                    <DollarSign className="h-4 w-4 text-green-500" />
                  ) : (
                    <CreditCard className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{transaction.balance}</TableCell>
                <TableCell>{transaction.goal || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
