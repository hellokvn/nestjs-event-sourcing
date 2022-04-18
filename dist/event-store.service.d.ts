import { EventModel } from './schemas/event-store.schema';
import { BaseEvent } from './events/base.event';
import { ExtendedAggregateRoot } from './aggregator/extended.aggregator';
export declare class EventStoreService<T extends ExtendedAggregateRoot> {
    private eventModel;
    saveEvents(aggregate: T): Promise<void>;
    getEvents(aggregateId: string): Promise<BaseEvent[] | never>;
    save(payload: any): Promise<EventModel>;
    findByAggregateIdentifier(aggregateIdentifier: string): Promise<EventModel[]>;
}
