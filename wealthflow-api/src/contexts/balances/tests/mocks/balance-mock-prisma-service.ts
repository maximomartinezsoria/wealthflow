import { Balance } from '@/contexts/balances/domain/balance.entity';

const userId = '1';

export class BalanceMockPrismaService {
  public balance = {
    findUnique: jest.fn(async ({ where }) => {
      if (where.id === '1') {
        return new Balance('1', 'Savings', 1000, 1000, userId, '#000000');
      }

      return null;
    }),
    findMany: jest.fn(async ({ where }) => {
      if (where.userId === userId) {
        return [new Balance('1', 'Savings', 1000, 1000, userId, '#000000')];
      }

      return [];
    }),
    createMany: jest.fn(),
    update: jest.fn(),
  };
}
