import { JwtPayload } from "jwt-decode";
import { UserTopic, userInformation, Degree, Credentials } from "@/types/user";
import { AcceptedTopic } from "@/types/topic";

export type AuthType = {
  isAuth: boolean;
  userAuthed: string;
  token: string;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  loading: boolean
  roles: string[];
};

type UserType = {
  user: UserTopic;
  degrees: Degree[];
  information: userInformation;
  userRoles: string[];
  role: string;
  isLoading: boolean;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setInformation: React.Dispatch<React.SetStateAction<userInformation>>;
  acceptedTopics: AcceptedTopic[];
};

export type customJwtPayload = JwtPayload & { id: string };