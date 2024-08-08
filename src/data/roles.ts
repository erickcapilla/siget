export type Rol = {
  id: number;
  value: string;
  role: string;
  color?: string;
}

export const roles: Rol[] = [
  {
    id: 1,
    value: 'ADMIN_ROLE',
    role: "Administrador",
    color: "#dc2626",
  },
  {
    id: 2,
    role: "Estudiante",
    value: 'STUDENT_ROLE',
    color: "#16a34a",
  },
  {
    id: 3,
    role: "Asesor",
    value: 'ASESOR_ROLE',
    color: "#0891b2",
  },
  {
    id: 4,
    role: "Revisor",
    value: "REVISOR_ROLE",
    color: "#7c3aed",
  },
  {
    id: 5,
    role: "Titular de materia",
    value: "TITULAR_MATERIA_ROLE",
    color: "#db2777",
  },
  {
    id: 6,
    role: "Administrativo",
    value: "ADMINISTRATIVO_ROLE",
    color: "#ca8a04",
  },
  {
    id: 7,
    role: "Coordinador",
    value: "COORDINADOR_ROLE",
    color: "#65a30d",
  },
];