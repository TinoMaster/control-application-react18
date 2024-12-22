import { ERole, UserRegisterModel } from "../models/api";
import { TRegisterOwnerDataModel } from "../models/zod";

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
