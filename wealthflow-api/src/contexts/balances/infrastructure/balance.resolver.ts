import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

import { JwtAuthGuard } from '@/contexts/auth/jwt-auth.guard';
import { BalanceCreator } from '@/contexts/balances/application/balance-creator/balance-creator';
import { BalanceFinder } from '@/contexts/balances/application/balance-finder/balance-finder';
import {
  BalanceObjectType,
  BalancesObjectType,
  CreateBalanceInput,
  CreateBalancesInput,
} from '@/contexts/balances/infrastructure/create-balance.dto';
import { ServerErrorException } from '@/shared/domain/exceptions/server-error.exception';

@Resolver(() => BalanceObjectType)
export class BalanceResolver {
  constructor(
    private readonly balanceCreator: BalanceCreator,
    private readonly balanceFinder: BalanceFinder,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BalanceObjectType)
  async createBalance(
    @Args('input') input: CreateBalanceInput,
  ): Promise<BalanceObjectType> {
    try {
      const balances = await this.balanceCreator.execute([
        {
          id: input.id ?? uuidv4(),
          name: input.name,
          amount: input.amount,
          userId: input.userId,
          color: input.color,
        },
      ]);

      return balances[0];
    } catch {
      throw new ServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BalancesObjectType)
  async createBalances(
    @Args('input') input: CreateBalancesInput,
  ): Promise<BalancesObjectType> {
    try {
      const balances = await this.balanceCreator.execute(
        input.balances.map((balanceInput) => ({
          id: balanceInput.id ?? uuidv4(),
          name: balanceInput.name,
          amount: balanceInput.amount,
          userId: balanceInput.userId,
          color: balanceInput.color,
        })),
      );

      return { balances };
    } catch (error) {
      console.log('createBalances', error);
      throw new ServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => BalancesObjectType)
  async balances(@Context() context): Promise<BalancesObjectType> {
    try {
      const user = context.req.user;
      const userId = user.userId;
      const balances = await this.balanceFinder.execute(userId);

      return { balances };
    } catch (error) {
      console.log('balances', error);
      throw new ServerErrorException();
    }
  }
}
