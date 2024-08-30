export const paths = {
  home: "/",
  login: "/login",
  reset: "/reset",
  newPassword: "/reset-password/",
  topics: "/topics",
  manage: "/manage",
  profile: "/profile/",
  document: "/document/",
  userDocument: "/document",
  advice: "/advice/",
  userAdvice: "/advice",
  degree: "/degree",
  graduates: "/graduates",
  schedule: "/schedule",
  userProfile: "/profile",
  admin: "/admin",
  adviceds: "/adviceds",
  accepteds: "/accepteds",
  viewDocument: "/view-document/",
  reviews: "/reviews",
}

export enum ROLES {
  ADMIN = "ADMIN_ROLE",
  STUDENT = "STUDENT_ROLE",
  ADVISOR = "ASESOR_ROLE",
  REVIEWER = "REVISOR_ROLE",
  SUBJECT_HOLDER = "TITULAR_MATERIA_ROLE",
  ADMINISTRATIVE = "ADMINISTRATIVO_ROLE",
  COORDINATOR = "COORDINADOR_ROLE",
}

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} - ${formattedTime} hrs`;
};

export const formatDay = (dateStr) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return `${formattedDate}`;
}

export const formatTime = (dateStr) => {
  const date = new Date(dateStr);

  const formattedTime = date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedTime} hrs`;
}