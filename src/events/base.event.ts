import { IEvent } from '@nestjs/cqrs';

export class BaseEvent implements IEvent {
  public id: string;
  public version: number;

  constructor(id?: string, version?: number) {
    if (id) {
      this.id = id;
    }

    if (version) {
      this.version = version;
    }
  }
}
