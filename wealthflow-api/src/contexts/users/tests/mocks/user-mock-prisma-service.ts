import { User } from '@/contexts/users/domain/user.entity';

const userEmail = 'john@doe.com';

export class UserMockPrismaService {
  public user = {
    findUnique: jest.fn(async ({ where }) => {
      if (where.email === userEmail) {
        return new User('1', userEmail, 'John Doe', 1000, 1000, 1);
      }

      return null;
    }),
    create: jest.fn(),
    update: jest.fn(),
  };
}
