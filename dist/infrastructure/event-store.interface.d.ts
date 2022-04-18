import { BaseEvent } from '../events/base.event';
export interface EventStore {
    saveEvents(aggregateId: string, events: BaseEvent[], expectedVersion: number): Promise<void>;
    getEvents(aggregateId: string): Promise<BaseEvent[] | never>;
}
