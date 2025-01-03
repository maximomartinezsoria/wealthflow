import { Balance } from '@/contexts/balances/domain/balance.entity';

export abstract class BalanceRepository {
  abstract findByUserId(userId: string): Promise<Balance[]>;

  abstract findById(balanceId: string): Promise<Balance>;

  abstract save(balances: Balance[]): Promise<void>;

  abstract update(
    balanceId: string,
    balance: Partial<Balance>,
  ): Promise<Balance>;
}
