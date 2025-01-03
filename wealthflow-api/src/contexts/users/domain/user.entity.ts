import { InvalidMonthlyIncomeException } from '@/contexts/users/domain/invalid-monthly-income.exception';
import { InvalidPaydayException } from '@/contexts/users/domain/invalid-payday.exception';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly monthlyIncome: number,
    public readonly totalMoney: number,
    public readonly payday: number,
  ) {
    if (monthlyIncome < 0) {
      throw new InvalidMonthlyIncomeException();
    }

    if (payday < 1 || payday > 31) {
      throw new InvalidPaydayException();
    }
  }
}
