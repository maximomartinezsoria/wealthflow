import { DomainEvent } from '@/shared/domain/events/domain-event';

export class TransactionCreatedEvent implements DomainEvent {
  readonly eventName = 'TransactionCreated';
  readonly occurredOn: Date;

  constructor(
    public readonly amount: number,
    public readonly type: string,
    public readonly userId: string,
    public readonly balanceId: string,
    public readonly balanceToId: string,
    public readonly goalId: string,
  ) {
    this.occurredOn = new Date();
  }
}
