import { Injectable } from '@nestjs/common';

import { BalanceCreatorDto } from '@/contexts/balances/application/balance-creator/balance-creator.dto';
import { Balance } from '@/contexts/balances/domain/balance.entity';
import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';
import { BalanceCreatedEvent } from '@/shared/domain/events/balance-created.event';
import { EventDispatcher } from '@/shared/domain/events/event-dispatcher';

@Injectable()
export class BalanceCreator {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(balanceCreatorDto: BalanceCreatorDto): Promise<Balance[]> {
    const userId = balanceCreatorDto[0].userId;

    const balances = balanceCreatorDto.map((balanceDto) => {
      return new Balance(
        balanceDto.id,
        balanceDto.name,
        balanceDto.amount,
        balanceDto.amount, // Initially the usable amount is the same as the amount
        balanceDto.userId,
        balanceDto.color,
      );
    });

    await this.balanceRepository.save(balances);

    for (const balance of balances) {
      await this.eventDispatcher.dispatch(
        new BalanceCreatedEvent(userId, balance.id, balance.amount),
      );
    }

    return balances;
  }
}
