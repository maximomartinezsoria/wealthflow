import { Balance } from '@/contexts/balances/domain/balance.entity';
import { PrismaBalanceRepository } from '@/contexts/balances/infrastructure/prisma-balance.repository';
import { BalanceMockPrismaService } from '@/contexts/balances/tests/mocks/balance-mock-prisma-service';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

describe('Prisma Balance Repository', () => {
  let prismaService: BalanceMockPrismaService;
  let balanceRepository: PrismaBalanceRepository;

  const userId = '1';

  beforeEach(() => {
    prismaService = new BalanceMockPrismaService();
    balanceRepository = new PrismaBalanceRepository(
      prismaService as unknown as PrismaService,
    );
  });

  describe('findById', () => {
    it('should call prismaService with given balanceId', async () => {
      await balanceRepository.findById('1');
      expect(prismaService.balance.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return balance', async () => {
      const balance = await balanceRepository.findById('1');
      expect(balance).toBeInstanceOf(Balance);
    });

    it('should return null if balance does not exist', async () => {
      const balance = await balanceRepository.findById('2');
      expect(balance).toBeNull();
    });
  });

  describe('findByUserId', () => {
    it('should call prismaService with given userId', async () => {
      await balanceRepository.findByUserId(userId);
      expect(prismaService.balance.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });

    it('should return array of balances', async () => {
      const balances = await balanceRepository.findByUserId(userId);
      expect(balances).toHaveLength(1);
      expect(balances[0]).toBeInstanceOf(Balance);
    });

    it('should return empty array if balance does not exist', async () => {
      const balances = await balanceRepository.findByUserId('2');
      expect(balances).toHaveLength(0);
    });
  });

  describe('save', () => {
    it('should call prismaService with given balance', async () => {
      const balanceData = {
        id: '1',
        name: 'Savings',
        amount: 1000,
        usable: 1000,
        userId: '1',
        color: '#000000',
      };

      const balance = new Balance(
        balanceData.id,
        balanceData.name,
        balanceData.amount,
        balanceData.usable,
        balanceData.userId,
        balanceData.color,
      );

      await balanceRepository.save([balance]);

      expect(prismaService.balance.createMany).toHaveBeenCalledWith({
        data: [{ ...balance }],
      });
    });
  });

  describe('update', () => {
    it('should call prismaService with given balanceId and balance', async () => {
      const balanceData = {
        id: '1',
        name: 'Savings',
        amount: 1000,
        usable: 1000,
        userId: '1',
        color: '#000000',
      };

      const balance = new Balance(
        balanceData.id,
        balanceData.name,
        balanceData.amount,
        balanceData.usable,
        balanceData.userId,
        balanceData.color,
      );

      await balanceRepository.update('1', balance);

      expect(prismaService.balance.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { ...balance },
      });
    });
  });
});
