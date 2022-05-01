import { ExtendedAggregateRoot } from './aggregate';
import { Type } from './helpers';
export declare class EventSourcingHandler<T extends ExtendedAggregateRoot> {
    private readonly eventStoreService;
    save(aggregate: T): Promise<void>;
    getById(aggregateClass: Type<T>, id: string): Promise<T>;
    private getLatestVersion;
}
