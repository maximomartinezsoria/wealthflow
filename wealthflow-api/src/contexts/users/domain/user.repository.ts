import { User } from '@/contexts/users/domain/user.entity';

export interface UserRepository {
  save(user: User): Promise<void>;
}
