import { User } from '@/users/domain/user.entity';

export interface UserRepository {
  save(user: User): Promise<void>;
}
