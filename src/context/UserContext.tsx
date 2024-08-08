import { useState, createContext, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks";
import { User, Information, Degree } from "@/types";
import userServices from "@/services/UserServices";

type UserContext = {
  information: Information;
  user: User;
  userRoles: string[];
  degrees: Degree[];
  role: string;
  isLoading: boolean;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContext>({} as UserContext);

interface Props {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [role, setRole] = useState(localStorage.getItem("siget-role") || "");
  const [information, setInformation] = useState<Information>();
  const [userRoles, setUserRoles] = useState([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { isAuth, userAuthed } = useAuth();

  const getUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await userServices.getUser(userAuthed);

      if (response.ok) {
        const res = await response.json();
        setUser(res.user);
        setDegrees(res.userDegreePrograms);
        setInformation(res.userInformation);
        setUserRoles(res.user && res.user.roles);
        console.log(res)

        if (role === "") {
          setRole(res.user && res.user.roles[0]);
          res.user && localStorage.setItem("siget-role", res.user.roles[0]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
