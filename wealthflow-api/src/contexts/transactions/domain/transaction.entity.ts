import { InvalidAmountException } from '@/contexts/transactions/domain/invalid-amount.exception';

export type TransactionType =
  | 'INCOME'
  | 'EXPENSE'
  | 'BALANCE_TRANSFER'
  | 'GOAL_ALLOCATION'
  | 'GOAL_DISALLOCATION';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly userId: string,
    public readonly balanceId: string,
    public readonly balanceToId: string,
    public readonly goalId: string,
    public readonly createdAt: Date,
  ) {
    if (amount < 0) {
      throw new InvalidAmountException();
    }
  }
}
