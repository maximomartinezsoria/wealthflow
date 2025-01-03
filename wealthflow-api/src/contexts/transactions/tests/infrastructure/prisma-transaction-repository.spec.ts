import {
  Transaction,
  TransactionType,
} from '@/contexts/transactions/domain/transaction.entity';
import { PrismaTransactionRepository } from '@/contexts/transactions/infrastructure/prisma-transaction.repository';
import { TransactionMockPrismaService } from '@/contexts/transactions/tests/mocks/transaction-mock-prisma-service';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const userId = '1';

describe('Prisma Transaction Repository', () => {
  let prismaService: TransactionMockPrismaService;
  let transactionRepository: PrismaTransactionRepository;

  beforeEach(() => {
    prismaService = new TransactionMockPrismaService();
    transactionRepository = new PrismaTransactionRepository(
      prismaService as unknown as PrismaService,
    );
  });

  describe('find', () => {
    it('should call prismaService with given userId and criteria', async () => {
      await transactionRepository.find(userId, {});

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        where: { AND: [{ userId }] },
      });
    });

    it('should call prismaService filtering by fromDate', async () => {
      await transactionRepository.find(userId, {
        fromDate: new Date(),
      });

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        where: { AND: [{ userId }, { date: { gte: expect.any(Date) } }] },
      });
    });

    it('should call prismaService filtering by toDate', async () => {
      await transactionRepository.find(userId, {
        toDate: new Date(),
      });

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        where: { AND: [{ userId }, { date: { lte: expect.any(Date) } }] },
      });
    });

    it('should call prismaService filtering by type', async () => {
      await transactionRepository.find(userId, {
        transactionType: 'INCOME',
      });

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        where: { AND: [{ userId }, { type: 'INCOME' }] },
      });
    });

    it('should call prismaService filtering by balanceId', async () => {
      await transactionRepository.find(userId, {
        balanceId: '1',
      });

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        where: { AND: [{ userId }, { balanceId: '1' }] },
      });
    });

    it('should return array of transactions', async () => {
      const transactions = await transactionRepository.find(userId, {});
      expect(transactions).toHaveLength(1);
      expect(transactions[0]).toBeInstanceOf(Transaction);
    });

    it('should return empty array if transactions do not exist', async () => {
      const transactions = await transactionRepository.find('2', {});
      expect(transactions).toHaveLength(0);
    });
  });

  describe('save', () => {
    it('should call prismaService with given transaction', async () => {
      const transactionData = {
        id: '1',
        amount: 1000,
        type: 'INCOME' as TransactionType,
        userId,
        balanceId: '1',
        balanceToId: '',
        goalId: '1',
        createdAt: new Date(),
      };

      const transaction = new Transaction(
        transactionData.id,
        transactionData.amount,
        transactionData.type,
        transactionData.userId,
        transactionData.balanceId,
        transactionData.balanceToId,
        transactionData.goalId,
        transactionData.createdAt,
      );

      await transactionRepository.save(transaction);

      expect(prismaService.transaction.create).toHaveBeenCalledWith({
        data: {
          id: transactionData.id,
          amount: transactionData.amount,
          type: transactionData.type,
          userId: transactionData.userId,
          balanceId: transactionData.balanceId,
          balanceToId: transactionData.balanceToId,
          goalId: transactionData.goalId,
        },
      });
    });
  });
});
