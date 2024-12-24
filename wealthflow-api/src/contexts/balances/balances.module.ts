import { Module } from '@nestjs/common';

import { BalanceCreator } from '@/contexts/balances/application/balance-creator/balance-creator';
import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';
import { BalanceResolver } from '@/contexts/balances/infrastructure/balance.resolver';
import { PrismaBalanceRepository } from '@/contexts/balances/infrastructure/prisma-balance.repository';

@Module({
  providers: [
    BalanceResolver,
    BalanceCreator,
    {
      provide: BalanceRepository,
      useClass: PrismaBalanceRepository,
    },
  ],
  controllers: [],
  imports: [],
  exports: [],
})
export class BalancesModule {}
