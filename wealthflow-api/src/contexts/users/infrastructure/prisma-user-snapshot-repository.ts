import { Injectable } from '@nestjs/common';

import { UserSnapshot } from '@/contexts/users/domain/user-snapshot.entity';
import { UserSnapshotRepository } from '@/contexts/users/domain/user-snapshot.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

@Injectable()
export class PrismaUserSnapshotRepository implements UserSnapshotRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(userSnapshots: UserSnapshot[]): Promise<void> {
    await this.prismaService.userSnapshot.createMany({
      data: userSnapshots.map((userSnapshot) => ({
        id: userSnapshot.id,
        userId: userSnapshot.userId,
        totalMoney: userSnapshot.totalMoney,
        createdAt: userSnapshot.createdAt,
      })),
    });
  }
}
