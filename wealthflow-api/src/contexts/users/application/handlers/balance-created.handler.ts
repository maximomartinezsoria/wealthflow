import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/contexts/users/domain/user.repository';
import { BalanceCreatedEvent } from '@/shared/domain/events/balance-created.event';

@Injectable()
export class BalanceCreatedHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: BalanceCreatedEvent): Promise<void> {
    const { userId, amount } = event;

    const user = await this.userRepository.find(userId);

    await this.userRepository.update(userId, {
      totalMoney: user.totalMoney + amount,
    });
  }
}
