import { User } from '@/contexts/users/domain/user.entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
}
