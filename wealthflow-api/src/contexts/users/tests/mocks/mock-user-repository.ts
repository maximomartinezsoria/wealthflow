import { User } from '@/contexts/users/domain/user.entity';
import { UserRepository } from '@/contexts/users/domain/user.repository';

export class MockUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'john@doe.com',
      name: 'John Doe',
      monthlyIncome: 5000,
      totalMoney: 10000,
      payday: 1,
    },
  ];

  findByEmail = jest.fn(async (email: string): Promise<User | null> => {
    return this.users.find((user) => user.email === email) || null;
  });

  save = jest.fn(async (user: User): Promise<void> => {
    this.users.push(user);
  });

  update = jest.fn(
    async (userId: string, user: Partial<Omit<User, 'id'>>): Promise<void> => {
      const userIndex = this.users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        return;
      }

      this.users = this.users.map((oldUser, index) =>
        index === userIndex ? { ...oldUser, ...user } : oldUser,
      );
    },
  );
}
