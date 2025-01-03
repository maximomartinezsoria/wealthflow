import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

import { JwtAuthGuard } from '@/contexts/auth/jwt-auth.guard';
import { TransactionCreator } from '@/contexts/transactions/application/transaction-creator/transaction-creator';
import { TransactionFinder } from '@/contexts/transactions/application/transaction-finder/transaction-finder';
import {
  Transaction,
  TransactionType,
} from '@/contexts/transactions/domain/transaction.entity';
import {
  CreateTransactionInput,
  FindTransactionInput,
  FindTransactionObjectType,
  TransactionObjectType,
} from '@/contexts/transactions/infrastructure/transaction.dto';
import { ServerErrorException } from '@/shared/domain/exceptions/server-error.exception';

@Resolver(() => TransactionObjectType)
export class TransactionResolver {
  constructor(
    private readonly transactionFinder: TransactionFinder,
    private readonly transactionCreator: TransactionCreator,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => FindTransactionObjectType)
  async transactions(
    @Context() context,
    @Args('input') input: FindTransactionInput,
  ): Promise<FindTransactionObjectType> {
    try {
      const user = context.req.user;
      const userId = user.userId;
      const transactions = await this.transactionFinder.execute({
        userId,
        criteria: input.criteria,
      });

      return { transactions };
    } catch {
      throw new ServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TransactionObjectType)
  async createTransaction(
    @Context() context,
    @Args('input') input: CreateTransactionInput,
  ): Promise<TransactionObjectType> {
    try {
      const user = context.req.user;
      const userId = user.userId;

      const transaction = new Transaction(
        uuidv4(),
        input.amount,
        input.type.toUpperCase() as TransactionType,
        userId,
        input.balanceId,
        input.balanceToId,
        input.goalId,
        new Date(),
      );

      await this.transactionCreator.execute(transaction);

      return transaction;
    } catch (error) {
      console.log(error);
      throw new ServerErrorException();
    }
  }
}
