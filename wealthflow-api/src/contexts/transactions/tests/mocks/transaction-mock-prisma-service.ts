import { Transaction } from '@/contexts/transactions/domain/transaction.entity';

const userId = '1';

export class TransactionMockPrismaService {
  public transaction = {
    findMany: jest.fn(async ({ where }) => {
      const userIdParam = where.AND.find(
        (param) => Object.keys(param)[0] === 'userId',
      ).userId;

      if (userIdParam === userId) {
        return [
          new Transaction(
            '1',
            1000,
            'INCOME',
            userId,
            '1',
            '',
            '1',
            new Date(),
          ),
        ];
      }

      return [];
    }),

    create: jest.fn(),
  };
}
