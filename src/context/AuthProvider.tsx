import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Credentials, LoginResponse } from "@/types/user";
import { AcceptedTopic } from "@/types/topic";
import { paths, ROLES } from "@/utils";

import authServices from "@/services/AuthServices";
import requestTopicServices from "@/services/RequestTopicServices";
import toast from "react-hot-toast";
import AuthContext from "./AuthContext";

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(localStorage.getItem("siget-token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<LoginResponse>();
  const [role, setRole] = useState(localStorage.getItem("siget-role") || "");
  const [acceptedTopics, setAcceptedTopics] = useState<AcceptedTopic[]>([]);
  const navigate = useNavigate();

  const login = async (credentials: Credentials) => {
    try {
      const response = await authServices.login(credentials);
      const data = await response.json();

      setUser(data);
      setToken(data.token);
      setIsAuthenticated(true);
      setRole(data.user.roles[0]);
      localStorage.setItem("siget-role", data.user.roles[0]);
      localStorage.setItem("siget-token", data.token);

      if (
        data.user.roles.includes(ROLES.STUDENT) ||
        data.user.roles.includes(ROLES.ADVISOR)
      ) {
        const res = await requestTopicServices.getAcceptedTopics(data.token);
        const da = await res.json();

        setAcceptedTopics(da.items);
      }

      navigate(paths.home);
    } catch (error) {
      toast.error(error.toString());
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setRole("");
    localStorage.removeItem("siget-token");
    localStorage.removeItem("siget-role");
    navigate(paths.login);
  };

  useEffect(() => {
    const refreshToken = async () => {
      const token = localStorage.getItem("siget-token") || "";

      if (token === "") {
        setLoading(false);
        setIsAuthenticated(false);
        
        return;
      }

      try {
        const res = await authServices.refreshToken(token);
        const data = await res.json();

        setUser(data);
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("siget-token", data.token);

        if (
          data.user.roles.includes(ROLES.STUDENT) ||
          data.user.roles.includes(ROLES.ADVISOR)
        ) {
          const res = await requestTopicServices.getAcceptedTopics(data.token);
          const da = await res.json();

          setAcceptedTopics(da.items);
          console.log(da)
        }

        if (role === "") {
          setRole(data.user.roles[0]);
          localStorage.setItem("siget-role", data.user.roles[0]);
        }
      } catch (error) {
        toast.error(error.toString());
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
        loading,
        role,
        user,
        acceptedTopics,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
