import { BusinessModel } from './business.model';
import { Role } from './roles.model';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: Role;
  active: boolean;
  businesses: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegisterModel {
  name: string;
  email: string;
  password: string;
  role: Role;
  active: boolean;
  business: BusinessModel;
}
