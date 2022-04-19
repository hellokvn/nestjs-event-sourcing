import { DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreService } from './event-store.service';
import { EventSourcingOptions } from './eventsourcing.options';
import { EventModel, EventModelSchema } from './schemas/event-store.schema';

export interface EventSourcingModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<any>;
  useClass?: Type<any>;
  useFactory?: (...args: any[]) => Promise<any> | any;
  connectionFactory?: any;
  inject?: any[];
  mongoUrl: string;
}

@Module({})
export class EventSourcingModule {
  static forRoot(opts: EventSourcingOptions): DynamicModule {
    return {
      imports: [
        MongooseModule.forRoot(opts.mongoUrl),
        MongooseModule.forFeature([{ name: EventModel.name, schema: EventModelSchema }]),
      ],
      global: true,
      module: EventSourcingModule,
      providers: [EventStoreService],
      exports: [EventStoreService],
    };
  }

  static forRootAsync(opts: EventSourcingModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: EventSourcingModule,
      imports: [
        MongooseModule.forRoot(opts.mongoUrl),
        MongooseModule.forFeature([{ name: EventModel.name, schema: EventModelSchema }]),
      ],
      providers: [EventStoreService],
      exports: [EventStoreService],
    };
  }
}
