import { create } from "zustand";
import { selectBusiness } from "../utilities/helpers/selectBusiness";
import { BusinessModel, ERole } from "../models/api";

interface BusinessState {
  businessList: BusinessModel[];
  business: BusinessModel;
  businessId: number | undefined;
  loading: boolean;
  addBusinessToBusinessList: (newBusiness: BusinessModel) => void;
  onChangeBusiness: (id: number) => void;
  initializeBusiness: (user: {
    role: ERole;
    businessesOwned: BusinessModel[];
    businesses: BusinessModel[];
  }) => void;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businessList: [],
  business: {} as BusinessModel,
  businessId: undefined,
  loading: true,

  addBusinessToBusinessList: (newBusiness) => {
    set((state) => ({
      businessList: [...state.businessList, newBusiness],
    }));
  },

  onChangeBusiness: (id) => {
    const { businessList } = get();
    const newBusiness = businessList.find((b) => b.id === id);
    if (newBusiness) {
      localStorage.setItem("businessId", newBusiness.id?.toString() || "");
      set({ business: newBusiness, businessId: newBusiness.id });
    }
  },

  initializeBusiness: (user) => {
    const businessList =
      user.role === ERole.OWNER ? user.businessesOwned : user.businesses;
    const selectedBusiness = selectBusiness(businessList) || businessList[0];

    set({
      loading: false,
      businessList,
      business: selectedBusiness,
      businessId: selectedBusiness?.id,
    });
  },
}));
