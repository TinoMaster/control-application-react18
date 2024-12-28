import { ConsumableModel } from "./consumables.model";

export interface CostModel {
  consumable: ConsumableModel;
  quantity: number;
}
