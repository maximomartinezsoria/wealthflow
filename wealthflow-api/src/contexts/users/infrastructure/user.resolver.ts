import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

import { UserCreator } from '@/contexts/users/application/user-creator/user-creator';
import {
  CreateUserInput,
  UserObjectType,
} from '@/contexts/users/infrastructure/create-user.dto';

@Resolver(() => UserObjectType)
export class UserResolver {
  constructor(private readonly userCreator: UserCreator) {}

  @Query(() => [UserObjectType])
  async users(): Promise<UserObjectType[]> {
    return [
      {
        id: '1',
        email: 'john@doe.com',
        name: 'John Doe',
        monthlyIncome: 1000,
        totalMoney: 1000,
      },
    ];
  }

  @Query(() => UserObjectType, { nullable: true })
  async user(@Args('id') id: string): Promise<UserObjectType | null> {
    return {
      id,
      email: 'john@doe.com',
      name: 'John Doe',
      monthlyIncome: 1000,
      totalMoney: 1000,
    };
  }

  @Mutation(() => UserObjectType)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<UserObjectType> {
    const user = await this.userCreator.execute({
      id: input.id ?? uuidv4(),
      email: input.email,
      name: input.name,
      monthlyIncome: input.monthlyIncome,
      totalMoney: input.totalMoney,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      monthlyIncome: user.monthlyIncome,
      totalMoney: user.totalMoney,
    };
  }
}
