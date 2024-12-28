import { CostModel } from "./cost.model";

export interface ServiceModel {
  id: number;
  name: string;
  description: string;
  price: number;
  businessId: number;
  costs: CostModel[];
  createdAt: Date;
  updatedAt: Date;
}
