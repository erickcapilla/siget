import { TopicProvider } from "./context/TopicContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { MainRoutes } from "./routes/Routes";

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <AuthProvider>
        <UserProvider>
          <TopicProvider>
            <MainRoutes />
          </TopicProvider>
        </UserProvider>
      </AuthProvider>
    </NextUIProvider>
  );
};

export default App;
