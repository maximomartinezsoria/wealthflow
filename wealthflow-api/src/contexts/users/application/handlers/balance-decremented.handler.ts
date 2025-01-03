import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/contexts/users/domain/user.repository';
import { BalanceDecrementedEvent } from '@/shared/domain/events/balance-decremented.event';

@Injectable()
export class BalanceDecrementedHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: BalanceDecrementedEvent): Promise<void> {
    const { userId, amount } = event;

    const user = await this.userRepository.find(userId);

    await this.userRepository.update(userId, {
      totalMoney: user.totalMoney - amount,
    });
  }
}
