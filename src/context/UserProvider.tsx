import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks";
import { userInformation, Degree, UserTopic } from "@/types/user";
import userServices from "@/services/UserServices";
import UserContext from "./UserContext";

interface Props {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [role, setRole] = useState(localStorage.getItem("siget-role") || "");
  const [information, setInformation] = useState<userInformation>();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserTopic>();

  const { isAuth, userAuthed } = useAuth();

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userServices.getUser(userAuthed);
      const data = await response.json();
      setUser(data.user);
      setDegrees(data.userDegreePrograms);
      setInformation(data.userInformation);
      setUserRoles(data.user && data.user.roles);
      console.log(data);

      if (role !== "") {
        setRole(data.user && data.user.roles[0]);
        data.user && localStorage.setItem("siget-role", data.user.roles[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userAuthed]);

  useEffect(() => {
    if (isAuth) {
      getUser();
    }
  }, [getUser]);

  return (
    <UserContext.Provider
      value={{
        userRoles,
        role,
        user,
        degrees,
        information,
        isLoading,
        setRole,
        setInformation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
