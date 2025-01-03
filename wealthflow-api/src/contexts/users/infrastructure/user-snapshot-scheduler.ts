import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class UserSnapshotScheduler {
  constructor(
    @InjectQueue('user-snapshot') private readonly snapshotQueue: Queue,
  ) {}

  async scheduleSnapshotJob(): Promise<void> {
    await this.snapshotQueue.add(
      'create-snapshots',
      {},
      { repeat: { cron: '0 0 * * *' } }, // Every midnight
    );
  }
}
