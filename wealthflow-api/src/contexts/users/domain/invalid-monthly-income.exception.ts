export class InvalidMonthlyIncomeException extends Error {
  constructor() {
    super('Monthly income cannot be negative.');
    this.name = 'InvalidMonthlyIncomeException';
  }
}
