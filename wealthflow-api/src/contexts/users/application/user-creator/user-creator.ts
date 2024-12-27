import { Injectable } from '@nestjs/common';

import { UserCreatorDto } from '@/contexts/users/application/user-creator/user-creator.dto';
import { User } from '@/contexts/users/domain/user.entity';
import { UserRepository } from '@/contexts/users/domain/user.repository';

@Injectable()
export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userCreatorDto: UserCreatorDto): Promise<User> {
    const user = new User(
      userCreatorDto.id,
      userCreatorDto.email,
      userCreatorDto.name,
      userCreatorDto.monthlyIncome,
      0, // total money is 0 when creating a new user. It only gets updated when the user creates a new transaction or balance
      0, // last month total money start at 0
      userCreatorDto.payday,
    );

    await this.userRepository.save(user);

    return user;
  }
}
