import { INavLinkItem } from "../types/global.types";
import HomeIcon from "@mui/icons-material/Home";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

export const APP_TITLE = "Control";

export const PUBLIC_NAV_LINKS: INavLinkItem[] = [
  { name: "home", path: "/home", label: "Home", icon: HomeIcon },
  {
    name: "about",
    path: "/about",
    label: "About",
    icon: NotListedLocationIcon,
  },
  {
    name: "contact",
    path: "/contact",
    label: "Contact",
    icon: PermContactCalendarIcon,
  },
];
