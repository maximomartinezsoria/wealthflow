import { InvalidMonthlyIncomeException } from '@/contexts/users/domain/invalid-monthly-income.exception';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly monthlyIncome: number,
    public readonly totalMoney: number,
  ) {
    if (monthlyIncome < 0) {
      throw new InvalidMonthlyIncomeException();
    }
  }
}
