import { User } from '@/contexts/users/domain/user.entity';
import { UserRepository } from '@/contexts/users/domain/user.repository';

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  save = jest.fn(async (user: User): Promise<void> => {
    this.users.push(user);
  });
}
