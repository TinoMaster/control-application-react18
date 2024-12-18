import { BusinessModel } from './business.model';
import { RoleModel } from './roles.model';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: RoleModel;
  active: boolean;
  businesses: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegisterModel {
  name: string;
  email: string;
  password: string;
  role: RoleModel;
  active: boolean;
  business: BusinessModel;
}
