import { Injectable } from '@nestjs/common';

import { BalanceFinderDto } from '@/contexts/balances/application/balance-finder/balance-finder.dto';
import { Balance } from '@/contexts/balances/domain/balance.entity';
import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';

@Injectable()
export class BalanceFinder {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  async execute(balanceFinderDto: BalanceFinderDto): Promise<Balance[]> {
    return this.balanceRepository.findByUserId(balanceFinderDto.userId);
  }
}
