import { Injectable } from '@nestjs/common';

import { Transaction } from '@/contexts/transactions/domain/transaction.entity';
import { TransactionRepository } from '@/contexts/transactions/domain/transaction.repository';
import { FindTransactionCriteria } from '@/contexts/transactions/infrastructure/transaction.dto';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(
    userId: string,
    criteria: FindTransactionCriteria,
  ): Promise<Transaction[]> {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        AND: [
          {
            userId,
          },
          ...this.buildCriteria(criteria),
        ],
      },
    });

    return transactions as Transaction[];
  }

  async save(transaction: Transaction): Promise<void> {
    await this.prismaService.transaction.create({
      data: {
        id: transaction.id,
        amount: transaction.amount,
        type: transaction.type,
        userId: transaction.userId,
        balanceId: transaction.balanceId,
        balanceToId: transaction.balanceToId || null,
        goalId: transaction.goalId || null,
      },
    });
  }

  private buildCriteria(criteria: FindTransactionCriteria) {
    const where = {};

    if (criteria.fromDate) {
      criteria.fromDate.setUTCHours(0, 0, 0, 0);
      where['createdAt'] = {
        gte: criteria.fromDate,
      };
    }

    if (criteria.toDate) {
      criteria.toDate.setUTCHours(23, 59, 59, 999);
      where['createdAt'] = {
        ...where['createdAt'],
        lte: criteria.toDate,
      };
    }

    if (criteria.transactionType) {
      where['type'] = criteria.transactionType.toUpperCase();
    }

    if (criteria.balanceId) {
      where['balanceId'] = criteria.balanceId;
    }

    return Object.keys(where).length > 0 ? [where] : [];
  }
}
