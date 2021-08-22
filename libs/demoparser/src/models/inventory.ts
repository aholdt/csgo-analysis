import { UserEvent } from "./user-event";

export class Inventory extends UserEvent {
  inventory: string[] = [];
}
