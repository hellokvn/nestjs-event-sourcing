/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { BaseEvent } from '../events/base.event';
export declare type EventModelDocument = EventModel & Document;
export declare class EventModel {
    id: ObjectId;
    name: string;
    timeStamp: Date;
    aggregateIdentifier: string;
    aggregateType: string;
    eventType: string;
    eventData: BaseEvent;
    version: number;
}
export declare const EventModelSchema: import("mongoose").Schema<Document<EventModel, any, any>, import("mongoose").Model<Document<EventModel, any, any>, any, any, any>, {}, {}>;
