import { DomainEvent } from '@/shared/domain/events/domain-event';

export class BalanceUpsertedEvent implements DomainEvent {
  readonly eventName = 'BalanceUpserted';
  readonly occurredOn: Date;

  constructor(
    public readonly userId: string,
    public readonly totalBalancesAmount: number,
  ) {
    this.occurredOn = new Date();
  }
}
