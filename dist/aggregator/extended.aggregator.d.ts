import { AggregateRoot } from '@nestjs/cqrs';
import { BaseEvent } from '../events/base.event';
export declare class ExtendedAggregateRoot extends AggregateRoot<BaseEvent> {
    id: string;
    version: number;
    type: string;
    constructor();
}
