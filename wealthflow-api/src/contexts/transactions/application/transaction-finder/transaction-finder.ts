import { Injectable } from '@nestjs/common';

import { TransactionFinderDto } from '@/contexts/transactions/application/transaction-finder/transaction-finder.dto';
import { Transaction } from '@/contexts/transactions/domain/transaction.entity';
import { TransactionRepository } from '@/contexts/transactions/domain/transaction.repository';

@Injectable()
export class TransactionFinder {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    transactionFinderDto: TransactionFinderDto,
  ): Promise<Transaction[]> {
    return this.transactionRepository.find(
      transactionFinderDto.userId,
      transactionFinderDto.criteria,
    );
  }
}
