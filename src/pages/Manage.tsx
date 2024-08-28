import { DoublePanelLayout } from "@/layouts/DoublePanelLayout";
import { AddUserForm, Users } from "@/components/features/users/manage";
import { useState, useEffect } from "react";
import userServices from "@/services/UserServices";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";

import { UsersResponse } from "@/types/user";
import { ROLES } from "@/utils";

export const Manage = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, role, user } = useAuth();

  useEffect(() => {
    if (role !== ROLES.SUBJECT_HOLDER) {
      setIsLoading(true);
      userServices
        .getUsers(token)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((error) => toast.error(error.toString()))
        .finally(() => setIsLoading(false));
    }

    if (role === ROLES.SUBJECT_HOLDER) {
      const degree = user?.userDegreePrograms.map((degree) => degree.id);

      setIsLoading(true);
      userServices
        .getUsersWithRoleAndDegree(token, ROLES.STUDENT, degree)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((error) => toast.error(error.toString()))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <DoublePanelLayout
      title={role === ROLES.SUBJECT_HOLDER ? "Estudiantes" : "Usuarios"}
      titleLeft={
        role === ROLES.SUBJECT_HOLDER
          ? "Agregar estudiantes"
          : "Agregar usuarios"
      }
      subtitleLeft={
        role === ROLES.SUBJECT_HOLDER
          ? "Presiona para agregar estudiantes"
          : "Presiona para agregar usuarios"
      }
      contentLeft={<AddUserForm setUsers={setUsers} />}
    >
      {isLoading ? (
        <Spinner />
      ) : users.length > 0 ? (
        <Users setUsers={setUsers} users={users} />
      ) : (
        <p>No hay usuarios</p>
      )}
    </DoublePanelLayout>
  );
};
