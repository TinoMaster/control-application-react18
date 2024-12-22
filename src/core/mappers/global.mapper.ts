import { ERole, UserModel, UserRegisterModel } from "../models/api";
import { TRegisterOwnerDataModel } from "../models/zod";
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
    business_name: user.businesses[0].name,
    business_address:
      user.businesses[0].address.street +
      " " +
      user.businesses[0].address.number +
      ", " +
      user.businesses[0].address.city +
      ", " +
      user.businesses[0].address.municipality,
    business_phone: user.businesses[0].phone,
  };
};

export const UserModelListToAuthRequestListMapper = (
  users: UserModel[]
): IAuthRequest[] => {
  return users.map(UserModelToAuthRequestMapper);
};
