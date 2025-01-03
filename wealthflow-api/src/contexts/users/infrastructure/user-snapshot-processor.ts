import { Process, Processor } from '@nestjs/bull';
import { v4 as uuidv4 } from 'uuid';

import { UserRepository } from '@/contexts/users/domain/user.repository';
import { UserSnapshot } from '@/contexts/users/domain/user-snapshot.entity';
import { UserSnapshotRepository } from '@/contexts/users/domain/user-snapshot.repository';

@Processor('user-snapshot')
export class UserSnapshotProcessor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSnapshotRepository: UserSnapshotRepository,
  ) {}

  @Process('create-snapshots')
  async handleCreateSnapshots(): Promise<void> {
    const users = await this.userRepository.findAll();

    const userSnapshots = users.map((user) => {
      return new UserSnapshot(uuidv4(), user.id, user.totalMoney, new Date());
    });

    await this.userSnapshotRepository.save(userSnapshots);

    console.log('Snapshots created successfully');
  }
}
