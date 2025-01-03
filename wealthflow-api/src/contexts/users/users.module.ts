import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { BalanceCreatedHandler } from '@/contexts/users/application/handlers/balance-created.handler';
import { BalanceDecrementedHandler } from '@/contexts/users/application/handlers/balance-decremented.handler';
import { BalanceIncrementedHandler } from '@/contexts/users/application/handlers/balance-incremented.handler';
import { UserCreator } from '@/contexts/users/application/user-creator/user-creator';
import { UserFinder } from '@/contexts/users/application/user-finder/user-finder';
import { UserRepository } from '@/contexts/users/domain/user.repository';
import { PrismaUserRepository } from '@/contexts/users/infrastructure/prisma-user.repository';
import { UserResolver } from '@/contexts/users/infrastructure/user.resolver';
import { EventDispatcher } from '@/shared/domain/events/event-dispatcher';

@Module({
  providers: [
    UserResolver,
    UserCreator,
    UserFinder,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    BalanceCreatedHandler,
    BalanceIncrementedHandler,
    BalanceDecrementedHandler,
  ],
  controllers: [],
  imports: [],
  exports: [],
})
export class UsersModule implements OnApplicationBootstrap {
  constructor(
    private readonly eventDispatcher: EventDispatcher,
    private readonly balanceCreatedHandler: BalanceCreatedHandler,
    private readonly balanceIncrementedHandler: BalanceIncrementedHandler,
    private readonly balanceDecrementedHandler: BalanceDecrementedHandler,
  ) {}

  onApplicationBootstrap(): void {
    this.eventDispatcher.register(
      'BalanceCreated',
      this.balanceCreatedHandler.handle.bind(this.balanceCreatedHandler),
    );
    this.eventDispatcher.register(
      'BalanceIncremented',
      this.balanceIncrementedHandler.handle.bind(
        this.balanceIncrementedHandler,
      ),
    );
    this.eventDispatcher.register(
      'BalanceDecremented',
      this.balanceDecrementedHandler.handle.bind(
        this.balanceDecrementedHandler,
      ),
    );
  }
}
