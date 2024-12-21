import { INavLinkItem } from "../types/global.types";
import HomeIcon from "@mui/icons-material/Home";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Groups3Icon from "@mui/icons-material/Groups3";
import StoreIcon from "@mui/icons-material/Store";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const APP_TITLE = "Control";

export const AppRoutes = {
  public: {
    register: "/register",
    login: "/login",
    about: "/about",
    contact: "/contact",
    home: "/home",
  },
  private: {
    dashboard: "/dashboard",
    sales: "/sales",
    inventory: "/inventory",
    employees: "/employees",
    clients: "/clients",
    store: "/store",
    reports: "/reports",
  },
};

export const PUBLIC_NAV_LINKS: INavLinkItem[] = [
  {
    name: "home",
    path: AppRoutes.public.home,
    label: "Inicio",
    icon: HomeIcon,
  },
  {
    name: "about",
    path: AppRoutes.public.home,
    label: "Acerca de",
    icon: NotListedLocationIcon,
  },
  {
    name: "contact",
    path: AppRoutes.public.contact,
    label: "Contacto",
    icon: PermContactCalendarIcon,
  },
];

export const PRIVATE_NAV_LINKS: INavLinkItem[] = [
  {
    name: "dashboard",
    path: AppRoutes.private.dashboard,
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    name: "sales",
    path: AppRoutes.private.sales,
    label: "Ventas",
    icon: ReceiptIcon,
  },
  {
    name: "inventory",
    path: AppRoutes.private.inventory,
    label: "Inventario",
    icon: InventoryIcon,
  },
  {
    name: "employees",
    path: AppRoutes.private.employees,
    label: "Empleados",
    icon: AssignmentIndIcon,
  },
  {
    name: "clients",
    path: AppRoutes.private.clients,
    label: "Clientes",
    icon: Groups3Icon,
  },
  {
    name: "store",
    path: AppRoutes.private.store,
    label: "Tienda",
    icon: StoreIcon,
  },
  {
    name: "reports",
    path: AppRoutes.private.reports,
    label: "Reportes",
    icon: SummarizeIcon,
  },
];
