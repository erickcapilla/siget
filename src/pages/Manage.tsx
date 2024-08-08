import { DoublePanelLayout } from "@/layouts/DoublePanelLayout";
import { AddUserForm, Users } from "@/components/features/users/manage";
import { useState, useEffect } from "react";
import userServices from "@/services/UserServices";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";

import { UsersResponse  } from "@/types/user"

export const Manage = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
      userServices
        .getUsers()
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(error => toast.error(error.toString()))
        .finally(() => setIsLoading(false));
  }, []);

  return (
    <DoublePanelLayout
      title="Usuarios"
      titleLeft="Agregar usuarios"
      subtitleLeft="Presiona para agregar usuarios"
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
