import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreService } from './event-store.service';
import { EventSourcingOptions } from './eventsourcing.options';
import { EventModel, EventModelSchema } from './schemas/event-store.schema';

@Module({})
export class EventSourcingModule {
  static forRoot(options?: EventSourcingOptions): DynamicModule {
    return {
      global: true,
      module: EventSourcingModule,
      imports: [
        MongooseModule.forRoot(options.mongoUrl),
        MongooseModule.forFeature([{ name: EventModel.name, schema: EventModelSchema }]),
      ],
      providers: [EventStoreService],
      exports: [EventStoreService],
    };
  }
}
