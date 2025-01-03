import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { BalanceCreator } from '@/contexts/balances/application/balance-creator/balance-creator';
import { BalanceFinder } from '@/contexts/balances/application/balance-finder/balance-finder';
import { TransactionCreatedHandler } from '@/contexts/balances/application/handlers/transaction-created.handler';
import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';
import { BalanceResolver } from '@/contexts/balances/infrastructure/balance.resolver';
import { PrismaBalanceRepository } from '@/contexts/balances/infrastructure/prisma-balance.repository';
import { EventDispatcher } from '@/shared/domain/events/event-dispatcher';

@Module({
  providers: [
    BalanceResolver,
    BalanceCreator,
    BalanceFinder,
    {
      provide: BalanceRepository,
      useClass: PrismaBalanceRepository,
    },
    TransactionCreatedHandler,
  ],
})
export class BalancesModule implements OnApplicationBootstrap {
  constructor(
    private readonly eventDispatcher: EventDispatcher,
    private readonly transactionCreatedHandler: TransactionCreatedHandler,
  ) {}

  onApplicationBootstrap(): void {
    this.eventDispatcher.register(
      'TransactionCreated',
      this.transactionCreatedHandler.handle.bind(
        this.transactionCreatedHandler,
      ),
    );
  }
}
