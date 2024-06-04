import { useState, createContext, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks";
import {
  User,
  Information,
  Degree,
  DocumentUrl,
  TopicAcceptedRequest,
} from "@/types";
import userServices from "@/services/UserServices";
import documentServices from "@/services/DocumentServices";
import requestTopicServices from "@/services/RequestTopicServices";

type UserContext = {
  setInformation: React.Dispatch<(prevState: undefined) => undefined>;
  setDocument: React.Dispatch<React.SetStateAction<DocumentUrl[]>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  getUser: () => Promise<void>;
  getUserDocument: () => Promise<void>;
  information: Information;
  user: User;
  userRoles: string[];
  degrees: Degree[];
  document: DocumentUrl[];
  myTopics: TopicAcceptedRequest;
  role: string;
};

export const UserContext = createContext<UserContext>({
  setInformation: () => {},
  setDocument: () => {},
  getUser: async () => {},
  getUserDocument: async () => {},
  setRole: () => {},
  information: {
    id: 0,
    name: "",
    fatherLastName: "",
    motherLastName: "",
    phoneNumber: "",
    address: "",
  },
  user: {
    id: "",
    email: "",
    roles: [],
    userInformation: { name: "", fatherLastName: "", motherLastName: "" },
  },
  userRoles: [],
  degrees: [],
  document: [],
  myTopics: { id: "", items: [], total: 0},
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
  const [document, setDocument] = useState<DocumentUrl[]>([]);
  const [myTopics, setMyTopics] = useState<TopicAcceptedRequest>();

  const { isAuth, userAuthed, token } = useAuth();

  const getUser = useCallback(async () => {
    try {
      const response = await userServices.getUser(userAuthed);

      if (response.ok) {
        const res = await response.json();
        setUser(res.user);
        setDegrees(res.userDegreePrograms);
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

  const getUserDocument = async () => {
    documentServices
      .getUserDocuments(token)
      .then((res) => res.json())
      .then((data) => setDocument(data))
      .catch((error) => console.error(error));
  };

  const getMyTopics = async () => {
    requestTopicServices.getAcceptedTopics(token)
      .then(res => res.json())
      .then(data => setMyTopics(data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    isAuth && getUser();
    getUserDocument();
    getMyTopics();
  }, [getUser, isAuth]);

  return (
    <UserContext.Provider
      value={{
        getUser,
        userRoles,
        role,
        setRole,
        user,
        degrees,
        information,
        setInformation,
        document,
        getUserDocument,
        myTopics,
        setDocument,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
