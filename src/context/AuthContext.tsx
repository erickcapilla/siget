import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import authServices from "@/services/AuthServices";
import { Credentials } from "@/types";

type customJwtPayload = JwtPayload & { id: string };

type UserAuth = {
  isAuth: boolean;
  userAuthed: string;
  token: string;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<UserAuth>({
  isAuth: false,
  userAuthed: "",
  token: "",
  login: async () => {},
  logout: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(localStorage.getItem("siget") || "");
  const [userAuthed, setUserAuthed] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  
  const navigate = useNavigate();

  const login = async (credentials: Credentials) => {
    try {
      const res = await authServices.login(credentials);
      const data = await res.json();

      if (data.token) {
        setIsAuth(true);
        setToken(data.token);
        localStorage.setItem("siget", data.token);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setToken("");
    localStorage.removeItem("siget");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    if (token !== "") {
      const decodedToken = jwtDecode<customJwtPayload>(token);
      setUserAuthed(decodedToken.id);
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, userAuthed, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
