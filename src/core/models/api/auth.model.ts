import { Role } from './roles.model';

interface TokenModel {
  token: string;
}

export interface AuthDataModel {
  email: string;
  password: string;
}

export interface LoginResponseModel extends TokenModel {
  refreshToken: string;
  role: Role;
}
export interface AuthModel extends TokenModel {}
