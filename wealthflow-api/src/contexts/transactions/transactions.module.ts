import { Module } from '@nestjs/common';

import { TransactionCreator } from '@/contexts/transactions/application/transaction-creator/transaction-creator';
import { TransactionFinder } from '@/contexts/transactions/application/transaction-finder/transaction-finder';
import { TransactionRepository } from '@/contexts/transactions/domain/transaction.repository';
import { PrismaTransactionRepository } from '@/contexts/transactions/infrastructure/prisma-transaction.repository';
import { TransactionResolver } from '@/contexts/transactions/infrastructure/transaction.resolver';

@Module({
  providers: [
    TransactionResolver,
    TransactionFinder,
    TransactionCreator,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  controllers: [],
  imports: [],
  exports: [],
})
export class TransactionsModule {}
