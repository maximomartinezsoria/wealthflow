import { DomainEvent } from '@/shared/domain/events/domain-event';
import {
  EventDispatcher,
  EventHandler,
} from '@/shared/domain/events/event-dispatcher';

export class MockEventDispatcher extends EventDispatcher {
  mockHandlers: Map<string, EventHandler[]> = new Map();

  register = jest.fn(
    async (eventName: string, eventHandler: EventHandler): Promise<void> => {
      this.mockHandlers.set(eventName, [eventHandler]);
    },
  );

  dispatch = jest.fn(async (event: DomainEvent): Promise<void> => {
    this.mockHandlers
      .get(event.eventName)
      ?.forEach((handler) => handler(event));
  });
}
