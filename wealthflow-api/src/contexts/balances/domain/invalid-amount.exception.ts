export class InvalidAmountException extends Error {
  constructor() {
    super('Amount cannot be negative.');
    this.name = 'InvalidAmountException';
  }
}
