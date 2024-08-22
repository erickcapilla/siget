import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Credentials } from "@/types/user";
import { paths } from "@/utils";

import authServices from "@/services/AuthServices";
import toast from "react-hot-toast";
import { customJwtPayload } from "@/types/context";
import AuthContext from "./AuthContext";

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(localStorage.getItem("siget-token") || "");
  const [userAuthed, setUserAuthed] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const login = async (credentials: Credentials) => {
    try {
      const res = await authServices.login(credentials);
      const data = await res.json();

      console.log(data)

      if (data.token) {
        setIsAuth(true);
        setToken(data.token);
        localStorage.setItem("siget-token", data.token);
        navigate(paths.login);
        return;
      }
    } catch (error) {
      toast.error(error.toString());
      console.error(error);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setToken("");
    setUserAuthed("");
    localStorage.removeItem("siget-token");
    localStorage.removeItem("siget-role");
    navigate(paths.login);
  };

  useEffect(() => {
    if (token !== "") {
      const decodedToken = jwtDecode<customJwtPayload>(token);
      setUserAuthed(decodedToken.id);
      setIsAuth(true);
      if (isAuth) {
        const currentTime = Date.now() / 1000;
        decodedToken.exp < currentTime && logout();
      }
    }
    setLoading(false);
  }, [token, isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, userAuthed, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};