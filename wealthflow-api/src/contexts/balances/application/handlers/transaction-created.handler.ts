import { Injectable } from '@nestjs/common';

import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';
import { BalanceDecrementedEvent } from '@/shared/domain/events/balance-decremented.event';
import { BalanceIncrementedEvent } from '@/shared/domain/events/balance-incremented.event';
import { EventDispatcher } from '@/shared/domain/events/event-dispatcher';
import { TransactionCreatedEvent } from '@/shared/domain/events/transaction-created.event';

@Injectable()
export class TransactionCreatedHandler {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async handle(event: TransactionCreatedEvent): Promise<void> {
    const { amount, type, balanceId, balanceToId } = event;

    const currentBalance = await this.balanceRepository.findById(balanceId);

    if (type === 'INCOME') {
      await this.balanceRepository.update(balanceId, {
        amount: currentBalance.amount + amount,
      });

      await this.eventDispatcher.dispatch(
        new BalanceIncrementedEvent(currentBalance.userId, balanceId, amount),
      );
    }

    if (type === 'EXPENSE') {
      await this.balanceRepository.update(balanceId, {
        amount: currentBalance.amount - amount,
      });

      await this.eventDispatcher.dispatch(
        new BalanceDecrementedEvent(currentBalance.userId, balanceId, amount),
      );
    }

    if (type === 'BALANCE_TRANSFER') {
      const currentBalanceTo =
        await this.balanceRepository.findById(balanceToId);

      await this.balanceRepository.update(balanceId, {
        amount: currentBalance.amount - amount,
      });

      await this.balanceRepository.update(balanceToId, {
        amount: currentBalanceTo.amount + amount,
      });
    }

    if (type === 'GOAL_ALLOCATION') {
      // TODO: Implement goal allocation
    }

    if (type === 'GOAL_DISALLOCATION') {
      // TODO: Implement goal disallocation
    }
  }
}
