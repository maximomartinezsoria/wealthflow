export class InvalidPaydayException extends Error {
  constructor() {
    super('Payday must be between 1 and 31');
    this.name = 'InvalidPaydayException';
  }
}
