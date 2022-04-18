import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { BaseEvent } from '../events/base.event';

export type EventModelDocument = EventModel & Document;

@Schema({ collection: 'events' })
export class EventModel {
  @Prop({ name: '_id' })
  public id: ObjectId;

  @Prop()
  public name: string;

  @Prop()
  public timeStamp: Date;

  @Prop()
  public aggregateIdentifier: string;

  @Prop()
  public aggregateType: string;

  @Prop()
  public eventType: string;

  @Prop()
  public eventData: BaseEvent;

  @Prop()
  public version: number;
}

export const EventModelSchema = SchemaFactory.createForClass(EventModel);
