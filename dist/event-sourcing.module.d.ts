import { DynamicModule } from '@nestjs/common';
import { EventSourcingModuleOptions, EventSourcingModuleAsyncOptions } from './event-sourcing.interface';
export declare class EventSourcingModule {
    static forRoot(options: EventSourcingModuleOptions): DynamicModule;
    static forRootAsync(options: EventSourcingModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
