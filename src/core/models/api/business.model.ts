import { AddressModel } from "./address.model";

export interface BusinessModel {
  id?: number;
  name: string;
  description: string;
  address: AddressModel;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
