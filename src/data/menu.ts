export type MenuItems = {
  id: string;
  name: string;
  path: string;
}

export const menuItems: MenuItems[] = [
  {
    id: "home",
    name: "Inicio",
    path: "/home",
  },
  {
    id: "topics",
    name: "Temas",
    path: "/topics"
  },
  {
    id: "manage",
    name: "Administrar usuarios",
    path: "/manage"
  },
  {
    id: "document",
    name: "Documento",
    path: "/document/b055a2b8-f69c-4cf0-81b2-48f86389f431",
  },
  {
    id: "advice",
    name: "Asesorías",
    path: "/advice"
  },
  {
    id: "profile",
    name: "Perfil",
    path: "/profile"
  },
  {
    id: "schedule",
    name: "Agenda",
    path: "/schedule"
  },
  {
    id: "degree",
    name: "Titulación",
    path: "/degree"
  },
  {
    id: "graduates",
    name: "Titulados",
    path: "/graduates",
  },
]