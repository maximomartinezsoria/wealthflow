import { Injectable } from '@nestjs/common';

import { User } from '@/contexts/users/domain/user.entity';
import { UserRepository } from '@/contexts/users/domain/user.repository';

@Injectable()
export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
