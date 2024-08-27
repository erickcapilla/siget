import { AuthProvider } from "./context/AuthProvider";
import { AppRoutes } from "./routes/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "text-sm w-auto",
            duration: 5000,
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
