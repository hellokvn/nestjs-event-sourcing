export class BaseCommand {
  public id: string;

  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }
}
