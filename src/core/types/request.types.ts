export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface IRegisterOwnerResponse {
  success: boolean;
  message: string;
}
