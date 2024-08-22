import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks";
import { userInformation, Degree, UserTopic } from "@/types/user";
import { AcceptedTopic } from "@/types/topic";
import userServices from "@/services/UserServices";
import requestTopicServices from "@/services/RequestTopicServices";
import UserContext from "./UserContext";

interface Props {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [role, setRole] = useState(localStorage.getItem("siget-role") || "");
  const [information, setInformation] = useState<userInformation>();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserTopic>();
  const [acceptedTopics, setAcceptedTopics] = useState<AcceptedTopic[]>([]);

  const { isAuth, userAuthed, token } = useAuth();

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

    if(role === "STUDENT_ROLE") {
      requestTopicServices
        .getAcceptedTopics(token)
        .then((response) => response.json())
        .then((data) => {
          setAcceptedTopics(data.items);
          console.log(data);
        })
        .catch((error) => console.error(error));
    }
  }, [getUser, role]);

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
        acceptedTopics,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
