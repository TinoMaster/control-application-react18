export interface BusinessModel {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
