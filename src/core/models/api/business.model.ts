import { AddressModel } from "./address.model";

export interface BusinessModel {
  id?: number;
  name: string;
  description: string;
  address: AddressModel;
  users: number[];
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
