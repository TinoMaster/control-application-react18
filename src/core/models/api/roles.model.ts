export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER',
  EMPLOYEE = 'EMPLOYEE',
  SUPERADMIN = 'SUPERADMIN',
}

export interface RoleModel {
  id: number;
  name: Role;
  description: string;
}
