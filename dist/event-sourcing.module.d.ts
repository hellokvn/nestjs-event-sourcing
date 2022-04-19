import { DynamicModule, ModuleMetadata, Type } from '@nestjs/common';
import { EventSourcingOptions } from './eventsourcing.options';
export interface EventSourcingModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    useExisting?: Type<any>;
    useClass?: Type<any>;
    useFactory?: (...args: any[]) => Promise<any> | any;
    connectionFactory?: any;
    inject?: any[];
    mongoUrl: string;
}
export declare class EventSourcingModule {
    static forRoot(opts: EventSourcingOptions): DynamicModule;
    static forRootAsync(opts: EventSourcingModuleAsyncOptions): DynamicModule;
}
