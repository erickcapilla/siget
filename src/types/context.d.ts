import { JwtPayload } from "jwt-decode";
import { Credentials, LoginResponse } from "@/types/user";
import { AcceptedTopic } from "@/types/topic";

export type AuthType = {
  isAuthenticated: boolean;
  token: string;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  loading: boolean
  role: string;
  user: LoginResponse;
  acceptedTopics: AcceptedTopic[];
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setAcceptedTopics: React.Dispatch<React.SetStateAction<AcceptedTopic[]>>;
  setUser: React.Dispatch<React.SetStateAction<LoginResponse>>;
};

export type customJwtPayload = JwtPayload & { id: string };