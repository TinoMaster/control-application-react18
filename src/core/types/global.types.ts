import { ElementType } from "react";
import { TRole } from "../models/api";

export interface INavLinkItem {
  name: string;
  path: string;
  icon?: ElementType;
  label: string;
  rolesExcluded?: TRole[];
}

export interface SuccessErrorState {
  status: boolean;
  message: string;
}
