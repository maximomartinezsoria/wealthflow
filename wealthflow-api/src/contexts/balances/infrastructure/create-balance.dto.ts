import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@InputType('BalanceInput')
@ObjectType('Balance')
class BalanceBase {
  @Field(() => ID)
  @IsString()
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNumber()
  @Min(0)
  amount: number;

  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  @IsIn(['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], {
    each: true,
  })
  color: string;
}

@InputType()
export class CreateBalanceInput extends BalanceBase {
  @Field(() => ID, { nullable: true })
  id?: string;
}

@ObjectType()
export class BalanceObjectType extends BalanceBase {
  @Field(() => ID, { nullable: false })
  id: string;
}

@InputType()
export class CreateBalancesInput {
  @Field(() => [CreateBalanceInput])
  balances: CreateBalanceInput[];
}

@ObjectType()
export class BalancesObjectType {
  @Field(() => [BalanceObjectType])
  balances: BalanceObjectType[];
}
