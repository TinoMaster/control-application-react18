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
