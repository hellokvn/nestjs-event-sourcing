import { ModuleMetadata, Type } from '@nestjs/common';

export interface EventSourcingModuleOptions {
  mongoUrl: string;
}

export interface EventSourcingModuleFactory {
  createEventSourcingModuleOptions: () => Promise<EventSourcingModuleOptions> | EventSourcingModuleOptions;
}

export interface EventSourcingModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<EventSourcingModuleFactory>;
  useExisting?: Type<EventSourcingModuleFactory>;
  useFactory?: (...args: any[]) => Promise<EventSourcingModuleOptions> | EventSourcingModuleOptions;
}
