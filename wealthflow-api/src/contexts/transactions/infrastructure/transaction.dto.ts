import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

import { TransactionType } from '@/contexts/transactions/domain/transaction.entity';

@InputType('TransactionInput')
@ObjectType('Transaction')
class TransactionBase {
  @Field(() => ID)
  @IsString()
  id?: string;

  @Field()
  @IsNumber()
  @Min(1)
  amount: number;

  @Field()
  @IsString()
  @IsIn([
    'INCOME',
    'EXPENSE',
    'BALANCE_TRANSFER',
    'GOAL_ALLOCATION',
    'GOAL_DISALLOCATION',
  ])
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  userId?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  balanceId: string;

  @Field({ nullable: true })
  @IsString()
  balanceToId?: string;

  @Field({ nullable: true })
  @IsString()
  goalId?: string;

  @Field()
  @IsDate()
  createdAt?: Date;
}

@ObjectType()
export class TransactionObjectType extends TransactionBase {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => ID, { nullable: false })
  userId: string;

  @Field({ nullable: false })
  @IsDate()
  createdAt: Date;
}

@InputType()
export class CreateTransactionInput extends TransactionBase {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({ nullable: true })
  @IsDate()
  createdAt?: Date;
}

@InputType()
export class FindTransactionCriteria {
  @Field({ nullable: true })
  fromDate?: Date;

  @Field({ nullable: true })
  toDate?: Date;

  @Field({ nullable: true })
  transactionType?: TransactionType;

  @Field({ nullable: true })
  balanceId?: string;
}

@InputType()
export class FindTransactionInput {
  @Field(() => FindTransactionCriteria)
  criteria: FindTransactionCriteria;
}

@ObjectType()
export class FindTransactionObjectType {
  @Field(() => [TransactionObjectType])
  transactions: TransactionObjectType[];
}
