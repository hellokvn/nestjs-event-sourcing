import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';

import { EVENT_SOURCING_TOKEN, EVENT_SOURCING_MODULE_OPTIONS } from './event-sourcing.constants';
import { EventSourcingHandler } from './event-sourcing.handler';
import {
  EventSourcingModuleOptions,
  EventSourcingModuleAsyncOptions,
  EventSourcingModuleFactory,
} from './event-sourcing.interface';
import { EventSourcingService } from './event-sourcing.service';

const SERVICES: any[] = [EventSourcingService, EventSourcingHandler];

@Global()
@Module({})
export class EventSourcingModule {
  public static forRoot(options: EventSourcingModuleOptions): DynamicModule {
    // const provider: Provider = createEventSourcingProvider(options);

    return {
      module: EventSourcingModule,
      providers: [...SERVICES],
      exports: [...SERVICES],
    };
  }

  public static forRootAsync(options: EventSourcingModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [EVENT_SOURCING_MODULE_OPTIONS],
      provide: EVENT_SOURCING_TOKEN,
      useFactory: async (options: EventSourcingModuleOptions) => options,
    };

    return {
      module: EventSourcingModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), provider, ...SERVICES],
      exports: [provider, ...SERVICES],
    };
  }

  private static createAsyncProviders(options: EventSourcingModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<EventSourcingModuleFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: EventSourcingModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: EVENT_SOURCING_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [(options.useClass || options.useExisting) as Type<EventSourcingModuleFactory>];

    return {
      provide: EVENT_SOURCING_MODULE_OPTIONS,
      useFactory: async (optionsFactory: EventSourcingModuleFactory) => await optionsFactory.createEventSourcingModuleOptions(),
      inject,
    };
  }
}
