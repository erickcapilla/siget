import { createContext } from "react";
import { AuthType } from "@/types/context";

const AuthContext = createContext<AuthType>({} as AuthType);

export default AuthContext;
