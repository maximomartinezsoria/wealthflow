import { User } from '@/contexts/users/domain/user.entity';
import { PrismaUserRepository } from '@/contexts/users/infrastructure/prisma-user.repository';
import { UserMockPrismaService } from '@/contexts/users/tests/mocks/user-mock-prisma-service';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

describe('Prisma User Repository', () => {
  let prismaService: UserMockPrismaService;
  let userRepository: PrismaUserRepository;
  const id = '1';

  beforeEach(() => {
    prismaService = new UserMockPrismaService();
    userRepository = new PrismaUserRepository(
      prismaService as unknown as PrismaService,
    );
  });

  describe('find', () => {
    it('should call prismaService with given id', async () => {
      await userRepository.find(id);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return user', async () => {
      const user = await userRepository.find(id);
      expect(user).toBeInstanceOf(User);
    });

    it('should return null if user does not exist', async () => {
      const user = await userRepository.find('2');
      expect(user).toBeNull();
    });
  });

  describe('save', () => {
    it('should call prismaService with given user', async () => {
      const user = {
        id: '1',
        email: 'john@doe.com',
        name: 'John Doe',
        monthlyIncome: 1000,
        totalMoney: 1000,
        lastMonthTotalMoney: 1000,
        payday: 1,
      };

      await userRepository.save(
        new User(
          user.id,
          user.email,
          user.name,
          user.monthlyIncome,
          user.totalMoney,
          user.lastMonthTotalMoney,
          user.payday,
        ),
      );

      expect(prismaService.user.create).toHaveBeenCalledWith({ data: user });
    });
  });

  describe('update', () => {
    it('should call prismaService with userId and fields', async () => {
      const userId = '1';
      const userFields = {
        monthlyIncome: 1000,
        totalMoney: 2000,
      };

      await userRepository.update(userId, userFields);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: {
          ...userFields,
        },
      });
    });
  });
});
