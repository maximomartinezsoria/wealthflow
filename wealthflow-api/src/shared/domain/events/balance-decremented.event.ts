import { DomainEvent } from '@/shared/domain/events/domain-event';

export class BalanceDecrementedEvent implements DomainEvent {
  readonly eventName = 'BalanceDecremented';
  readonly occurredOn: Date;

  constructor(
    public readonly userId: string,
    public readonly balanceId: string,
    public readonly amount: number,
  ) {
    this.occurredOn = new Date();
  }
}
