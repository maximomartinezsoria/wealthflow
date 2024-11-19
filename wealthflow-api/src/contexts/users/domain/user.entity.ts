export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly monthlyIncome: number,
    public readonly totalMoney: number,
  ) {}
}
