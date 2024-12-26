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
      userCreatorDto.totalMoney,
      userCreatorDto.payday,
    );

    await this.userRepository.save(user);

    return user;
  }
}
