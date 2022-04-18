import { IEventSourcingHandler } from './handlers/event-sourcing.handler';
import { ExtendedAggregateRoot } from './aggregator/extended.aggregator';
import { Type } from './helpers/utils.helper';
export declare class EventSourcingHandler<T extends ExtendedAggregateRoot> implements IEventSourcingHandler<T> {
    private eventStoreService;
    save(aggregate: T): Promise<void>;
    getById(aggregateClass: Type<T>, id: string): Promise<T>;
    private getLatestVersion;
}
