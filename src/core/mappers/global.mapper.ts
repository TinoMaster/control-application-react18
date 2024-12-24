import {
  BusinessModel,
  ERole,
  UserModel,
  UserRegisterModel,
} from "../models/api";
import { EmployeeModel } from "../models/api/employee";
import { TRegisterOwnerDataModel } from "../models/zod";
import { TRegisterEmployeeDataModel } from "../models/zod/registerEmployee";
import { IAuthRequest } from "../types/admin/admin.types";

export const registerFormToRegisterOwnerMapper = (
  data: TRegisterOwnerDataModel
): UserRegisterModel => {
  return {
    name: data.name + " " + data.lastName,
    email: data.email,
    password: data.password,
    role: ERole.OWNER,
    active: true,
    business: {
      name: data.businessName,
      description: data.businessDescription,
      address: {
        street: data.addressStreet,
        number: data.addressNumber,
        city: data.addressCity,
        zip: data.addressZipCode,
        municipality: data.addressMunicipality,
      },
      phone: data.businessPhone,
    },
  };
};

const UserModelToAuthRequestMapper = (user: UserModel): IAuthRequest => {
  return {
    userId: user.id,
    user_name: user.name,
    user_email: user.email,
    user_data_request: new Date(),
    business_name: user.businessesOwned[0].name,
    business_address:
      user.businessesOwned[0].address.street +
      " " +
      user.businessesOwned[0].address.number +
      ", " +
      user.businessesOwned[0].address.city +
      ", " +
      user.businessesOwned[0].address.municipality,
    business_phone: user.businessesOwned[0].phone,
  };
};

export const UserModelListToAuthRequestListMapper = (
  users: UserModel[]
): IAuthRequest[] => {
  return users.map(UserModelToAuthRequestMapper);
};

export const zodEmployeeToEmployeeMapper = (
  data: TRegisterEmployeeDataModel,
  businesses: BusinessModel[]
): EmployeeModel => {
  return {
    id: "",
    phone: data.phone,
    address: {
      street: data.addressStreet,
      number: data.addressNumber,
      city: data.addressCity,
      municipality: data.addressMunicipality,
      zip: data.addressZipCode,
    },
    user: {
      id: 0,
      name: data.name + " " + data.lastName,
      email: data.email,
      password: data.password,
      role: ERole.EMPLOYEE,
      active: true,
      businesses: businesses,
      businessesOwned: []
    },
    dni: data.dni,
  };
};
