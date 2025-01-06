import { ServiceModel } from "./service.model";

export interface ServiceSaleModel {
  id?: number;
  quantity: number;
  service: ServiceModel;
  businessFinalSale: number;
  createdAt?: Date;
  updatedAt?: Date;
}
