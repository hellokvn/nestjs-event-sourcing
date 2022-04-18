import { Model } from 'mongoose';
import { EventModel, EventModelDocument } from './schemas/event-store.schema';
import { BaseEvent } from './events/base.event';
export declare class EventStoreService {
    private eventModel;
    constructor(eventModel: Model<EventModelDocument>);
    saveEvents(aggregateId: string, events: BaseEvent[], expectedVersion: number, type: string): Promise<void>;
    getEvents(aggregateId: string): Promise<BaseEvent[] | never>;
    save(payload: any): Promise<EventModel>;
    findByAggregateIdentifier(aggregateIdentifier: string): Promise<EventModel[]>;
}
