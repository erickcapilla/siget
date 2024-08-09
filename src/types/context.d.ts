import { JwtPayload } from "jwt-decode";
import { Credentials } from "@/types/user";
import { UserTopic, userInformation, Degree } from "@/types/user";

export type AuthType = {
  isAuth: boolean;
  userAuthed: string;
  token: string;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  loading: boolean
};

type UserType = {
  user: UserTopic;
  degrees: Degree[];
  information: userInformation;
  userRoles: string[];
  role: string;
  isLoading: boolean;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

export type customJwtPayload = JwtPayload & { id: string };