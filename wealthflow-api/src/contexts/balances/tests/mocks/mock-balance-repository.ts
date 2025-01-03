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

  findById = jest.fn(async (balanceId: string): Promise<Balance> => {
    return this.balances.find((balance) => balance.id === balanceId) || null;
  });

  findByUserId = jest.fn(async (userId: string): Promise<Balance[]> => {
    return this.balances.filter((balance) => balance.userId === userId) || null;
  });

  save = jest.fn(async (balances: Balance[]): Promise<void> => {
    this.balances.push(...balances);
  });

  update = jest.fn(
    async (balanceId: string, balance: Partial<Balance>): Promise<Balance> => {
      const index = this.balances.findIndex(
        (balance) => balance.id === balanceId,
      );
      this.balances[index] = { ...this.balances[index], ...balance };

      return this.balances[index];
    },
  );
}
