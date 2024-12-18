import { Role, UserRegisterModel } from "../models/api";
import { TRegisterOwnerDataModel } from "../models/zod";

export const registerFormToRegisterOwnerMapper = (
  data: TRegisterOwnerDataModel
): UserRegisterModel => {
  return {
    name: data.name + " " + data.lastName,
    email: data.email,
    password: data.password,
    role: Role.OWNER,
    active: true,
    business: {
      name: data.businessName,
      description: data.businessDescription,
      address: {
        street: data.addressStreet,
        number: data.addressNumber,
        city: data.addressCity,
        zip: data.addressZipCode,
      },
      phone: data.businessPhone,
      email: data.businessEmail,
    },
  };
};
