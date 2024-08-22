import { IconProps } from "@/types";
export type MenuItems = {
  id: string;
  name: string;
  path: string;
  icon?: React.FC<IconProps>;
  iconActive?: React.FC<IconProps>;
};

import {
  HomeOutline,
  SettingsOutline,
  TopicOutline,
  UsersOutline,
  UserOutline,
  DocumentOutline,
  PaperCheckOutline,
  CalendarOutline,
} from "@/components/icons";
import {
  HomeSolid,
  SettingsSolid,
  TopicSolid,
  UsersSolid,
  UserSolid,
  DocumentSolid,
  PaperCheckSolid,
  CalendarSolid,
} from "@/components/icons";

export const menuItems: MenuItems[] = [
  {
    id: "home",
    name: "Inicio",
    path: "/",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "admin",
    name: "Administrar",
    path: "/admin",
    icon: SettingsOutline,
    iconActive: SettingsSolid,
  },
  {
    id: "topics",
    name: "Temas",
    path: "/topics",
    icon: TopicOutline,
    iconActive: TopicSolid,
  },
  {
    id: "manage",
    name: "Administrar usuarios",
    path: "/manage",
    icon: UsersOutline,
    iconActive: UsersSolid,
  },
  {
    id: "document",
    name: "Documento",
    path: "/document",
    icon: DocumentOutline,
    iconActive: DocumentSolid,
  },
  {
    id: "advice",
    name: "Asesorías",
    path: "/advice",
    icon: PaperCheckOutline,
    iconActive: PaperCheckSolid,
  },
  {
    id: "profile",
    name: "Perfil",
    path: "/profile",
    icon: UserOutline,
    iconActive: UserSolid,
  },
  {
    id: "schedule",
    name: "Agenda",
    path: "/schedule",
    icon: CalendarOutline,
    iconActive: CalendarSolid,
  },
];
