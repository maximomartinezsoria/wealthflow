import { Resolver, Query } from '@nestjs/graphql';
import { Transaction } from './transactions/transaction.entity';

@Resolver(() => Transaction)
export class TransactionResolver {
  @Query(() => Transaction)
  getTransaction(): Transaction {
    return {
      id: '1',
      name: 'Sample Transaction',
      description: 'This is an example item.',
    };
  }
}
