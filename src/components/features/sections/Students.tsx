import { Users } from "@/components/features";
import userServices from "@/services/UserServices";
import { useEffect, useState } from "react";
import { UsersResponse } from "@/types/user";
import { useAuth } from "@/hooks";
import { ROLES } from "@/utils";
import { Spinner } from "@nextui-org/react";

export const StudentsSection = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  useEffect(() => {
    const degree = user?.userDegreePrograms.map((degree) => degree.id);

    userServices
      .getUsersWithRoleAndDegree(token, ROLES.STUDENT, degree)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="size-full">
      {loading ? (
        <Spinner />
      ) : users.length > 0 ? (
        <Users users={users} setUsers={setUsers} />
      ) : (
        <p>No hay estudiantes</p>
      )}
    </div>
  );
};
