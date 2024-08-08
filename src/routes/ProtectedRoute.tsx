import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  isAllowed: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/login",
  children,
}: Props) => {
  const { loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};