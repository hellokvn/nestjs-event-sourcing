import { IEventSourcingHandler } from './handlers/event-sourcing.handler';
import { ExtendedAggregateRoot } from './aggregator/extended.aggregator';
export declare class EventSourcingHandler<T extends ExtendedAggregateRoot> implements IEventSourcingHandler<T> {
    private eventStoreService;
    save(aggregate: T): Promise<void>;
    getById(aggregate: T, id: string): Promise<any>;
    private getLatestVersion;
}
