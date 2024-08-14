import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AppSkeleton } from "@/components/features";

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

  if (loading) return <AppSkeleton />;
  
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};