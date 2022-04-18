import { Injectable, Inject } from '@nestjs/common';
import { EventStoreService } from './event-store.service';
import { BaseEvent } from './events/base.event';
import { IEventSourcingHandler } from './handlers/event-sourcing.handler';
import { ExtendedAggregateRoot } from './aggregator/extended.aggregator';

@Injectable()
export class EventSourcingHandler<T extends ExtendedAggregateRoot>
  implements IEventSourcingHandler<T>
{
  constructor(
    @Inject(EventStoreService)
    private eventStoreService: EventStoreService,
  ) {}

  public async save(aggregate: T): Promise<void> {
    console.log('AccountEventSourcingHandler/save');
    await this.eventStoreService.saveEvents(
      aggregate.id,
      aggregate.getUncommittedEvents(),
      aggregate.version,
      aggregate.type,
    );

    // aggregate.markChangesAsCommitted();
  }

  public async getById(aggregate: T, id: string): Promise<any> {
    console.log('AccountEventSourcingHandler/getById');
    const events: BaseEvent[] = await this.eventStoreService.getEvents(id);

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
