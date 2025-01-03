import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

import { JwtAuthGuard } from '@/contexts/auth/jwt-auth.guard';
import { UserCreator } from '@/contexts/users/application/user-creator/user-creator';
import { UserFinder } from '@/contexts/users/application/user-finder/user-finder';
import {
  CreateUserInput,
  FindUserInput,
  UserObjectType,
} from '@/contexts/users/infrastructure/user.dto';
import { ServerErrorException } from '@/shared/domain/exceptions/server-error.exception';

@Resolver(() => UserObjectType)
export class UserResolver {
  constructor(
    private readonly userCreator: UserCreator,
    private readonly userFinder: UserFinder,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserObjectType, { nullable: true })
  async user(
    @Args('input') input: FindUserInput,
  ): Promise<UserObjectType | null> {
    try {
      const user = await this.userFinder.execute(input.id);
      return user;
    } catch (error) {
      console.error('user', error);
      throw new ServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserObjectType)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<UserObjectType> {
    try {
      const user = await this.userCreator.execute({
        id: input.id ?? uuidv4(),
        email: input.email,
        name: input.name,
        monthlyIncome: input.monthlyIncome,
        payday: input.payday,
      });

      return user;
    } catch (error) {
      console.error('createUser', error);
      throw new ServerErrorException();
    }
  }
}
