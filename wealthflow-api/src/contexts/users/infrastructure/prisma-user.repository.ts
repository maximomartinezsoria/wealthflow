import { Injectable } from '@nestjs/common';

import { User } from '@/contexts/users/domain/user.entity';
import { UserRepository } from '@/contexts/users/domain/user.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        monthlyIncome: user.monthlyIncome,
        totalMoney: user.totalMoney,
      },
    });
  }
}
