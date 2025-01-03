import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getTransactions } from "@/app/dashboard/actions";
import { createTransaction } from "@/components/Transactions/createTransaction";
import { formSchema } from "@/components/Transactions/transactionsFormSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType, transactionTypes, useStore } from "@/lib/store";

export function NewTransactionsDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  const { balances, goals, setTransactions } = useStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: TransactionType.Income,
      amount: 0,
      balanceId: "",
      balanceToId: "",
      goalId: "",
    },
  });
  const selectedTransactionType = form.watch("type");

  const handleAddTransaction = async (values: z.infer<typeof formSchema>) => {
    const transaction = {
      amount: values.amount,
      type: values.type,
      balanceId: values.balanceId,
      balanceToId: values.balanceToId,
      goalId: values.goalId,
    };

    setIsSubmitting(true);

    await createTransaction(transaction);

    const newTransactions = await getTransactions({});
    setTransactions(newTransactions);

    setIsSubmitting(false);

    setIsNewTransactionOpen(false);
  };

  return (
    <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddTransaction)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactionTypes.map(({ key, value }) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      {...field}
                      onChange={(event) => {
                        field.onChange(parseFloat(event.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedTransactionType !== TransactionType.GoalDisallocation && (
              <FormField
                control={form.control}
                name="balanceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select balance" />
                        </SelectTrigger>
                        <SelectContent>
                          {balances.map((balance) => (
                            <SelectItem key={balance.id} value={balance.id}>
                              {balance.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedTransactionType === TransactionType.BalanceTransfer && (
              <FormField
                control={form.control}
                name="balanceToId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer To</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select balance" />
                        </SelectTrigger>
                        <SelectContent>
                          {balances.map((balance) => (
                            <SelectItem key={balance.id} value={balance.id}>
                              {balance.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {[
              TransactionType.GoalAllocation,
              TransactionType.GoalDisallocation,
            ].includes(selectedTransactionType) && (
              <FormField
                control={form.control}
                name="goalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal (Optional)</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {goals
                            .filter(
                              (goal) =>
                                goal.balanceId === form.watch("balanceId"),
                            )
                            .map((goal) => (
                              <SelectItem key={goal.name} value={goal.name}>
                                {goal.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Transaction...
                  </>
                ) : (
                  "Add Transaction"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
