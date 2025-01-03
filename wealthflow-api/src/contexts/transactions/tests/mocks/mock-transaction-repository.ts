import { TransactionType } from '@prisma/client';

import { Transaction } from '@/contexts/transactions/domain/transaction.entity';
import { TransactionRepository } from '@/contexts/transactions/domain/transaction.repository';
import { FindTransactionCriteria } from '@/contexts/transactions/infrastructure/transaction.dto';

export class MockTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [
    {
      id: '1',
      amount: 1000,
      type: TransactionType.INCOME,
      userId: '1',
      balanceId: '1',
      balanceToId: '',
      goalId: '1',
      createdAt: new Date(),
    },
  ];

  find = jest.fn(
    async (
      userId: string,
      criteria: FindTransactionCriteria,
    ): Promise<Transaction[]> => {
      return this.transactions.filter(
        (transaction) =>
          transaction.userId === userId &&
          (!criteria.fromDate || transaction.createdAt >= criteria.fromDate) &&
          (!criteria.toDate || transaction.createdAt <= criteria.toDate) &&
          (!criteria.transactionType ||
            transaction.type === criteria.transactionType) &&
          (!criteria.balanceId || transaction.balanceId === criteria.balanceId),
      );
    },
  );

  save = jest.fn(async (transaction: Transaction): Promise<void> => {
    this.transactions.push(transaction);
  });
}
