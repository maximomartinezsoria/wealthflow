import { User } from '@/contexts/users/domain/user.entity';

const userId = '1';

export class UserMockPrismaService {
  public user = {
    findUnique: jest.fn(async ({ where }) => {
      if (where.id === userId) {
        return new User('1', 'john@doe.com', 'John Doe', 1000, 1000, 1);
      }

      return null;
    }),
    create: jest.fn(),
    update: jest.fn(),
  };
}
