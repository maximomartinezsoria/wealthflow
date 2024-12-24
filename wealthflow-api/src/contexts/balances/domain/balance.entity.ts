import { InvalidAmountException } from '@/contexts/balances/domain/invalid-amount.exception';

export class Balance {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly usable: number,
    public readonly userId: string,
    public readonly color: string,
  ) {
    if (amount < 0) {
      throw new InvalidAmountException();
    }
  }
}
