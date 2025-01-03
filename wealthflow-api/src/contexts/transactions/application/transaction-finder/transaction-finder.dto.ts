import { TransactionFindCriteria } from '@/contexts/transactions/domain/transaction.repository';

export interface TransactionFinderDto {
  userId: string;
  criteria: TransactionFindCriteria;
}
