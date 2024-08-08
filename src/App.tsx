import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { AppRoutes } from "./routes/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: "text-sm w-auto",
              duration: 5000,
            }}
          />
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
    </>
  );
};

export default App;
