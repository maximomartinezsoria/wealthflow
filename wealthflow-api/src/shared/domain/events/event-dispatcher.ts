import { Injectable } from '@nestjs/common';

import { DomainEvent } from '@/shared/domain/events/domain-event';

export type EventHandler = (event: any) => Promise<void>;

@Injectable()
export class EventDispatcher {
  private handlers: Map<string, EventHandler[]> = new Map();

  // Register an event handler
  register(eventName: string, handler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  // Dispatch an event synchronously
  async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName) || [];
    for (const handler of handlers) {
      await handler(event); // Handle each event sequentially
    }
  }
}
