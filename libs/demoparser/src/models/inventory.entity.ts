import { UserEvent } from "./user-event.entity";

export class Inventory extends UserEvent {
  inventory: string[] = [];
}
