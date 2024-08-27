import { Users } from "@/components/features";
import { useState, useEffect } from "react";
import userServices from "@/services/UserServices";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";
import { UsersResponse } from "@/types/user";

export const UsersSection = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
      userServices
        .getUsers(token)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(error => toast.error(error.toString()))
        .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : users.length > 0 ? (
        <Users setUsers={setUsers} users={users} />
      ) : (
        <p>No hay usuarios</p>
      )}
    </>
  )
}