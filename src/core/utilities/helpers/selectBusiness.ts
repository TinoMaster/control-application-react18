import { BusinessModel } from "../../models/api";

export const selectBusiness = (businesses: BusinessModel[]): BusinessModel => {
  const businessId = localStorage.getItem("businessId");
  const business = businesses.find((b) => b.id === Number(businessId));
  return business ? business : businesses[0];
};
