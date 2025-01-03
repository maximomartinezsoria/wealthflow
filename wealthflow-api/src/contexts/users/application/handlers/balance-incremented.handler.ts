import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/contexts/users/domain/user.repository';
import { BalanceIncrementedEvent } from '@/shared/domain/events/balance-incremented.event';

@Injectable()
export class BalanceIncrementedHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: BalanceIncrementedEvent): Promise<void> {
    const { userId, amount } = event;

    const user = await this.userRepository.find(userId);

    console.log(user);

    await this.userRepository.update(userId, {
      totalMoney: user.totalMoney + amount,
    });
  }
}
