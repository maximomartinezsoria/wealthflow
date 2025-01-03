import { Injectable } from '@nestjs/common';

import { User } from '@/contexts/users/domain/user.entity';
import { UserRepository } from '@/contexts/users/domain/user.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.email,
      user.name,
      user.monthlyIncome,
      user.totalMoney,
      user.payday,
    );
  }

  async save(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        monthlyIncome: user.monthlyIncome,
        totalMoney: user.totalMoney,
        payday: user.payday,
      },
    });
  }

  async update(
    userId: string,
    userFields: Partial<Omit<User, 'id'>>,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userFields,
      },
    });
  }

  async incrementTotalMoney(userId: string, amount: number): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        totalMoney: {
          increment: amount,
        },
      },
    });
  }

  async decrementTotalMoney(userId: string, amount: number): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        totalMoney: {
          decrement: amount,
        },
      },
    });
  }
}
