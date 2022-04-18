import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventModel, EventModelDocument } from './schemas/event-store.schema';
import { BaseEvent } from './events/base.event';

@Injectable()
export class EventStoreService {
  constructor(
    @InjectModel(EventModel.name)
    private eventModel: Model<EventModelDocument>,
  ) {}

  public async saveEvents(
    aggregateId: string,
    events: BaseEvent[],
    expectedVersion: number,
    type: string,
  ): Promise<void> {
    console.log('AccountEventStore/saveEvents');
    const eventStream: EventModel[] = await this.findByAggregateIdentifier(
      aggregateId,
    );

    // optimistic concurrency check
    if (
      expectedVersion != -1 &&
      eventStream[eventStream.length - 1].version !== expectedVersion
    ) {
      console.log('--- ERR --- ConcurrencyException');
    }

    let version: number = expectedVersion;

    events.forEach(async (event: BaseEvent) => {
      const { constructor }: any = Object.getPrototypeOf(event);
      console.log('event', constructor.name);
      version++;
      event.version = version;

      const eventModel: EventModel = new EventModel();
      eventModel.aggregateIdentifier = aggregateId;
      eventModel.aggregateType = type;
      eventModel.eventType = constructor.name;
      eventModel.version = version;
      eventModel.eventData = event;
      eventModel.timeStamp = new Date();

      await this.save(eventModel);

      // if (!eventModel._id) {
      //   // produce
      // }
    });
  }

  public async getEvents(aggregateId: string): Promise<BaseEvent[] | never> {
    console.log('AccountEventStore/getEvents', aggregateId);
    const eventStream: EventModel[] = await this.findByAggregateIdentifier(
      aggregateId,
    );

    if (!eventStream || !eventStream.length) {
      throw new HttpException('Incorrect account ID provided!', 500);
    }

    return eventStream.map((aggregate: EventModel) => {
      (aggregate.eventData as any).constructor = { name: aggregate.eventType };
      aggregate.eventData = Object.assign(
        Object.create(aggregate.eventData),
        aggregate.eventData,
      );

      return aggregate.eventData;
    });
  }

  public save(payload: any): Promise<EventModel> {
    const model = new this.eventModel(payload);

    return model.save();
  }

  public findByAggregateIdentifier(
    aggregateIdentifier: string,
  ): Promise<EventModel[]> {
    return this.eventModel.find({ aggregateIdentifier }).exec();
  }
}