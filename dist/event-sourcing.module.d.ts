import { DynamicModule } from '@nestjs/common';
import { EventSourcingOptions } from './eventsourcing.options';
export declare class EventSourcingModule {
    static forRoot(opts: EventSourcingOptions): DynamicModule;
}
