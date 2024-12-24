import { Injectable } from '@nestjs/common';

import { Balance } from '@/contexts/balances/domain/balance.entity';
import { BalanceRepository } from '@/contexts/balances/domain/balance.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

@Injectable()
export class PrismaBalanceRepository implements BalanceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByUserId(userId: string): Promise<Balance[]> {
    return this.prismaService.balance.findMany({
      where: {
        userId,
      },
    });
  }

  async save(balances: Balance[]): Promise<void> {
    await this.prismaService.balance.createMany({
      data: balances.map((balance) => ({
        id: balance.id,
        name: balance.name,
        amount: balance.amount,
        usable: balance.usable,
        userId: balance.userId,
        color: balance.color,
      })),
    });
  }
}