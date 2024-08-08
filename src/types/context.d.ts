import { JwtPayload } from "jwt-decode";
import { Credentials } from "@/types/user";

export type AuthContext = {
  isAuth: boolean;
  userAuthed: string;
  token: string;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  loading: boolean
};

export type customJwtPayload = JwtPayload & { id: string };