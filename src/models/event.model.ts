import { ObjectId } from 'mongodb';

import { BaseEvent } from '../events/base.event';

export class Event {
  public _id: ObjectId;

  public name: string;

  public timeStamp: Date;

  public aggregateIdentifier: string;

  public aggregateType: string;

  public eventType: string;

  public eventData: BaseEvent;

  public version: number;
}
