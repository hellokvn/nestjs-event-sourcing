import { ExtendedAggregateRoot } from './aggregate';
import { Type } from './helpers/utils.helper';
export declare class EventSourcingHandler<T extends ExtendedAggregateRoot> {
    private eventStoreService;
    save(aggregate: T): Promise<void>;
    getById(aggregateClass: Type<T>, id: string): Promise<T>;
    private getLatestVersion;
}
