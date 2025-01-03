import { DomainEvent } from '@/shared/domain/events/domain-event';

export class BalanceIncrementedEvent implements DomainEvent {
  readonly eventName = 'BalanceIncremented';
  readonly occurredOn: Date;

  constructor(
    public readonly userId: string,
    public readonly balanceId: string,
    public readonly amount: number,
  ) {
    this.occurredOn = new Date();
  }
}
