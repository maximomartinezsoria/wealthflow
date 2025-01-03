import {
  Transaction,
  TransactionType,
} from '@/contexts/transactions/domain/transaction.entity';

export interface TransactionFindCriteria {
  fromDate?: Date;
  toDate?: Date;
  transactionType?: TransactionType;
  balanceId?: string;
}

export abstract class TransactionRepository {
  abstract find(
    userId: string,
    criteria: TransactionFindCriteria,
  ): Promise<Transaction[]>;

  abstract save(transaction: Transaction): Promise<void>;
}
