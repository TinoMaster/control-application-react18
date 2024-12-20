import { INavLinkItem } from "../types/global.types";
import HomeIcon from "@mui/icons-material/Home";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

export const APP_TITLE = "Control";

export const PUBLIC_NAV_LINKS: INavLinkItem[] = [
  { name: "home", path: "/home", label: "Inicio", icon: HomeIcon },
  {
    name: "about",
    path: "/about",
    label: "Acerca de",
    icon: NotListedLocationIcon,
  },
  {
    name: "contact",
    path: "/contact",
    label: "Contacto",
    icon: PermContactCalendarIcon,
  },
];

export const PRIVATE_NAV_LINKS: INavLinkItem[] = [
  { name: "dashboard", path: "/dashboard", label: "Dashboard", icon: HomeIcon },
  {
    name: "profile",
    path: "/profile",
    label: "Perfil",
    icon: NotListedLocationIcon,
  },
];
