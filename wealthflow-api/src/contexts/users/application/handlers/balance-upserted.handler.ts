import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/contexts/users/domain/user.repository';
import { BalanceUpsertedEvent } from '@/shared/domain/events/balance-upserted.event';

@Injectable()
export class BalanceUpsertedHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: BalanceUpsertedEvent): Promise<void> {
    const { userId, totalBalancesAmount } = event;

    await this.userRepository.update(userId, {
      totalMoney: totalBalancesAmount,
    });
  }
}
