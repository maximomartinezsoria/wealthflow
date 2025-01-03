import { UserSnapshot } from '@/contexts/users/domain/user-snapshot.entity';

export abstract class UserSnapshotRepository {
  abstract save(userSnapshots: UserSnapshot[]): Promise<void>;
}
