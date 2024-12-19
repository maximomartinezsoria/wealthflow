export class ServerErrorException extends Error {
  constructor() {
    super('Unexpected Error');
    this.name = 'ServerErrorException';
  }
}
