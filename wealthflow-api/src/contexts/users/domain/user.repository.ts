import { User } from '@/contexts/users/domain/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;

  abstract save(user: User): Promise<void>;

  abstract update(
    userId: string,
    user: Partial<Omit<User, 'id'>>,
  ): Promise<void>;
}
