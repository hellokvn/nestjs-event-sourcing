import { IEvent } from '@nestjs/cqrs';
export declare class BaseEvent implements IEvent {
    id: string;
    version: number;
    constructor(id?: string, version?: number);
}
