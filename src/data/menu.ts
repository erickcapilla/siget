import { IconProps } from "@/types";
export type MenuItems = {
  id: string;
  name: string;
  path: string;
  icon?: React.FC<IconProps>;
  iconActive?: React.FC<IconProps>;
  roles: string[];
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
  StudentsOutline,
  DocumentListOutline,
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
  StudentsSolid,
  DocumentListSolid,
} from "@/components/icons";

export const menuItems: MenuItems[] = [
  {
    id: "home",
    name: "Inicio",
    path: "/",
    icon: HomeOutline,
    iconActive: HomeSolid,
    roles: [
      "ADMIN_ROLE",
      "STUDENT_ROLE",
      "ASESOR_ROLE",
      "REVISOR_ROLE",
      "TITULAR_MATERIA_ROLE",
      "ADMINISTRATIVO_ROLE",
      "COORDINADOR_ROLE",
    ],
  },
  {
    id: "admin",
    name: "Administrar",
    path: "/admin",
    icon: SettingsOutline,
    iconActive: SettingsSolid,
    roles: ["ADMIN_ROLE"],
  },
  {
    id: "topics",
    name: "Temas",
    path: "/topics",
    icon: TopicOutline,
    iconActive: TopicSolid,
    roles: ["STUDENT_ROLE", "ASESOR_ROLE"],
  },
  {
    id: "manage",
    name: "Administrar usuarios",
    path: "/manage",
    icon: UsersOutline,
    iconActive: UsersSolid,
    roles: ["ADMIN_ROLE", "TITULAR_MATERIA_ROLE", "ADMINISTRATIVO_ROLE"],
  },
  {
    id: "document",
    name: "Documento",
    path: "/document",
    icon: DocumentOutline,
    iconActive: DocumentSolid,
    roles: ["STUDENT_ROLE"],
  },
  {
    id: "advice",
    name: "Asesorías",
    path: "/advice",
    icon: PaperCheckOutline,
    iconActive: PaperCheckSolid,
    roles: ["STUDENT_ROLE"],
  },
  {
    id: "adviceds",
    name: "Asesorados",
    path: "/adviceds",
    icon: StudentsOutline,
    iconActive: StudentsSolid,
    roles: ["ASESOR_ROLE"],
  },
  {
    id: "reviews",
    name: "Temas asignados",
    path: "/reviews",
    icon: DocumentListOutline,
    iconActive: DocumentListSolid,
    roles: ["REVISOR_ROLE"],
  },
  {
    id: "accepteds",
    name: "Temas aceptados",
    path: "/accepteds",
    icon: DocumentListOutline,
    iconActive: DocumentListSolid,
    roles: ["TITULAR_MATERIA_ROLE"],
  },
  {
    id: "profile",
    name: "Perfil",
    path: "/profile",
    icon: UserOutline,
    iconActive: UserSolid,
    roles: [
      "ADMIN_ROLE",
      "STUDENT_ROLE",
      "ASESOR_ROLE",
      "REVISOR_ROLE",
      "TITULAR_MATERIA_ROLE",
      "ADMINISTRATIVO_ROLE",
      "COORDINADOR_ROLE",
    ],
  },
  {
    id: "schedule",
    name: "Agenda",
    path: "/schedule",
    icon: CalendarOutline,
    iconActive: CalendarSolid,
    roles: [
      "ADMIN_ROLE",
      "STUDENT_ROLE",
      "ASESOR_ROLE",
      "REVISOR_ROLE",
      "TITULAR_MATERIA_ROLE",
      "ADMINISTRATIVO_ROLE",
      "COORDINADOR_ROLE",
    ],
  },
];
