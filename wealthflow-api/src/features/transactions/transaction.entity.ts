import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
