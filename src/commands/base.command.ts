import { ICommand } from '@nestjs/cqrs';

export class BaseCommand implements ICommand {
  public id: string;

  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }
}
