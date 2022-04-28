import { Injectable, Inject } from '@nestjs/common';

import { ExtendedAggregateRoot } from './aggregate';
import { EventSourcingService } from './event-sourcing.service';
import { BaseEvent } from './events/base.event';
import { Type } from './helpers/utils.helper';

@Injectable()
export class EventSourcingHandler<T extends ExtendedAggregateRoot> {
  @Inject(EventSourcingService)
  private eventStoreService: EventSourcingService<T>;

  public async save(aggregate: T): Promise<void> {
    await this.eventStoreService.saveEvents(aggregate);

    // commit
  }

  public async getById(aggregateClass: Type<T>, id: string): Promise<T> {
    const aggregate: T = new aggregateClass();
    const events: BaseEvent[] = await this.eventStoreService.getEvents(id);

    if (!events || !events.length) {
      return aggregate;
    }

    if (events && events.length) {
      aggregate.loadFromHistory(events);

      aggregate.version = this.getLatestVersion(events);
    }

    return aggregate;
  }

  private getLatestVersion(events: BaseEvent[]): number {
    return events.reduce((a, b) => (a.version > b.version ? a : b)).version;
  }
}
