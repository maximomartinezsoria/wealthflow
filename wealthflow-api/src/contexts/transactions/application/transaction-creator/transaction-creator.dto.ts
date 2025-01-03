import { TransactionType } from '@/contexts/transactions/domain/transaction.entity';

export interface TransactionCreatorDto {
  id: string;
  amount: number;
  type: TransactionType;
  userId: string;
  balanceId: string;
  balanceToId?: string;
  goalId?: string;
  createdAt: Date;
}
