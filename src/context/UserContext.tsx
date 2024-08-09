import { createContext } from "react";
import { UserType } from "@/types/context";

const UserContext = createContext<UserType>({} as UserType);

export default UserContext;