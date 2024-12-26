import { Balance } from '@/contexts/balances/domain/balance.entity';
import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';

export class MockBalanceRepository implements BalanceRepository {
  private balances: Balance[] = [
    {
      id: '1',
      name: 'Savings',
      amount: 1000,
      usable: 1000,
      userId: '1',
      color: '#000000',
    },
  ];

  findByUserId = jest.fn(async (userId: string): Promise<Balance[]> => {
    return this.balances.filter((balance) => balance.userId === userId) || null;
  });

  save = jest.fn(async (balances: Balance[]): Promise<void> => {
    this.balances.push(...balances);
  });
}
