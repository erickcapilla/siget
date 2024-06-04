export const roleColors = {
  ADMIN_ROLE: "#dc2626",
  STUDENT_ROLE: "#16a34a",
  ASESOR_ROLE: "#0891b2",
  REVISOR_ROLE: "#7c3aed",
  TITULAR_MATERIA_ROLE: "#db2777",
  ADMINISTRATIVO_ROLE: "#ca8a04",
  COORDINADOR_ROLE: "#65a30d",
};

export const roleNames = {
  ADMIN_ROLE: "Administrador",
  STUDENT_ROLE: "Estudiante",
  ASESOR_ROLE: "Asesor",
  REVISOR_ROLE: "Revisor",
  TITULAR_MATERIA_ROLE: "Titular de materia",
  ADMINISTRATIVO_ROLE: "Administrativo",
  COORDINADOR_ROLE: "Coordinador",
};

export const degreeNames = {
  computacion: "Ingeniería en computación",
  electronicos: "Ingeniería en sistemas electrónicos",
  mecanica: "Ingeniería en mecánica",
  quimica: "Ingeniería en química",
  matematicas: "Matemáticas aplicadas",
  industial: "Química industrial",
};

export const optionNames = {
  prototype: "Prototipo",
  thesis: "Tesis",
  memoirs: "Memorias",
};

export function getSafePercent(percent: number) {
  if (percent > 100 || percent < 0 || typeof percent !== "number") {
    console.warn(
      `[react-step-progress-bar]: The value passed to percent or position needs to be a number between 0 and 100 (passed value: ${percent}).`
    );
  }
  return Math.min(100, Math.max(percent, 0));
}

export function getStepPosition(
  steps: number,
  stepIndex: number,
  hasStepZero: boolean
) {
  if (hasStepZero) {
    return (100 / (steps - 1)) * stepIndex;
  }
  return (100 / steps) * (stepIndex + 1);
}

export const stepPercentage = {
  "1": 0,
  "2": 20,
  "3": 35,
  "4": 52,
  "5": 70,
  "6": 85,
  "7": 100,
}