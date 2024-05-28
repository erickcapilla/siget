import { useState, createContext, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks";
import { User, Information, Degree } from "@/types";
import userServices from "@/services/UserServices";

type UserContext = {
  setInformation: React.Dispatch<(prevState: undefined) => undefined>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  getUser: () => Promise<void>;
  information: Information;
  user: User;
  userRoles: string[];
  degrees: Degree[];
  role: string;
};

export const UserContext = createContext<UserContext>({
  setInformation: () => {},
  getUser: async () => {},
  setRole: () => {},
  information: {
    id: 0,
    name: "",
    fatherLastName: "",
    motherLastName: "",
    phoneNumber: "",
    address: "",
  },
  user: { id: "", email: "", roles: [] },
  userRoles: [],
  degrees: [],
  role: "",
});

interface Props {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [information, setInformation] = useState<Information>();
  const [userRoles, setUserRoles] = useState([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [user, setUser] = useState();

  const { isAuth, userAuthed } = useAuth();

  const getUser = useCallback(async () => {
    try {
      const response = await userServices.getUser(userAuthed)

      if (response.ok) {
        const res = await response.json();
        setUser(res.user);
        setDegrees(res.userDegreePrograms);
        console.log(res.userDegreePrograms)
        setInformation(res.userInformation);
        setUserRoles(res.user.roles);
        if (role === "") {
          setRole(res.user.roles[0]);
          localStorage.setItem("role", res.user.roles[0]);
        }
      }

    } catch (error) {
      console.error(error);
    }
  }, [userAuthed, role]);

  useEffect(() => {
    isAuth && getUser();
  }, [getUser, isAuth]);

  return (
    <UserContext.Provider
      value={{ getUser, userRoles, role, setRole, user, degrees, information, setInformation }}
    >
      {children}
    </UserContext.Provider>
  );
};
