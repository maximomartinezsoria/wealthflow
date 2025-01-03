import { Injectable } from '@nestjs/common';

import { TransactionCreatorDto } from '@/contexts/transactions/application/transaction-creator/transaction-creator.dto';
import { Transaction } from '@/contexts/transactions/domain/transaction.entity';
import { TransactionRepository } from '@/contexts/transactions/domain/transaction.repository';
import { EventDispatcher } from '@/shared/domain/events/event-dispatcher';
import { TransactionCreatedEvent } from '@/shared/domain/events/transaction-created.event';

@Injectable()
export class TransactionCreator {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(
    transactionCreatorDto: TransactionCreatorDto,
  ): Promise<Transaction> {
    const transaction = new Transaction(
      transactionCreatorDto.id,
      transactionCreatorDto.amount,
      transactionCreatorDto.type,
      transactionCreatorDto.userId,
      transactionCreatorDto.balanceId,
      transactionCreatorDto.balanceToId,
      transactionCreatorDto.goalId,
      transactionCreatorDto.createdAt,
    );

    await this.transactionRepository.save(transaction);

    await this.eventDispatcher.dispatch(
      new TransactionCreatedEvent(
        transactionCreatorDto.amount,
        transactionCreatorDto.type,
        transactionCreatorDto.userId,
        transactionCreatorDto.balanceId,
        transactionCreatorDto.balanceToId,
        transactionCreatorDto.goalId,
      ),
    );

    return transaction;
  }
}
