import { z } from "zod";

import { TransactionType } from "@/lib/store";

export const formSchema = z
  .object({
    type: z.union([
      z.literal(TransactionType.Income),
      z.literal(TransactionType.Expense),
      z.literal(TransactionType.BalanceTransfer),
      z.literal(TransactionType.GoalAllocation),
      z.literal(TransactionType.GoalDisallocation),
    ]),
    amount: z.number().positive(),
    balanceId: z.string().optional(),
    // balanceToId is only required for balance transfers and can't be same as balanceId
    balanceToId: z.string().optional(),
    goalId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      [
        TransactionType.Income,
        TransactionType.Expense,
        TransactionType.BalanceTransfer,
      ].includes(data.type) &&
      !data.balanceId
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["balanceId"],
        message: "Balance is required",
      });
    }

    if (data.type === TransactionType.BalanceTransfer) {
      if (!data.balanceToId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["balanceToId"],
          message: "Balance to transfer money to is required",
        });
      }

      if (data.balanceId === data.balanceToId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["balanceToId"],
          message: "Transfer to balance can't be same as transfer from balance",
        });
      }
    }

    if (
      [
        TransactionType.GoalAllocation,
        TransactionType.GoalDisallocation,
      ].includes(data.type) &&
      !data.goalId
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["goalId"],
        message: "Goal is required",
      });
    }
  });
