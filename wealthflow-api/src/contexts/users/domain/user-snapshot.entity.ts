export class UserSnapshot {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly totalMoney: number,
    public readonly createdAt: Date,
  ) {}
}
