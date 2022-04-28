import { AggregateRoot } from '@nestjs/cqrs';

import { BaseEvent } from '../events/base.event';

export class ExtendedAggregateRoot extends AggregateRoot<BaseEvent> {
  public id: string;
  public version: number;
  public type: string;

  constructor() {
    super();

    this.version = -1;
    this.type = this.constructor.name;
  }
}
