import { Balance } from '@/contexts/balances/domain/balance.entity';

export abstract class BalanceRepository {
  abstract findByUserId(userId: string): Promise<Balance[]>;

  abstract save(balances: Balance[]): Promise<void>;
}
