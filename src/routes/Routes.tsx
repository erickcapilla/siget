import { Routes, Route } from "react-router-dom";
import {
  Login,
  Home,
  Topics,
  Manage,
  Document,
  Advice,
  Degree,
  Graduates,
  Profile,
  Schedule,
  ResetPassword,
  NewPassword,
  Admin,
  UserProfile,
  UserDocument,
  UserAdvice,
} from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "@/hooks";
import { paths } from "@/utils";

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={!isAuthenticated} redirectTo={paths.home} />}
      >
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.reset} element={<ResetPassword />} />
        <Route path={`${paths.newPassword}:id`} element={<NewPassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute isAllowed={!!user?.userInformation} redirectTo={paths.home} />
        }
      >
        <Route path={paths.topics} element={<Topics />} />
        <Route path={paths.manage} element={<Manage />} />
        <Route path={`${paths.profile}:id`} element={<Profile />} />
        <Route path={`${paths.document}:id`} element={<Document />} />
        <Route path={`${paths.userDocument}`} element={<UserDocument />} />
        <Route path={`${paths.advice}:id`} element={<Advice />} />
        <Route path={paths.degree} element={<Degree />} />
        <Route path={paths.graduates} element={<Graduates />} />
        <Route path={paths.schedule} element={<Schedule />} />
        <Route path={paths.admin} element={<Admin />} />
        <Route path={paths.userAdvice} element={<UserAdvice />} />
      </Route>

      <Route
        element={<ProtectedRoute isAllowed={isAuthenticated} redirectTo={paths.login} />}
      >
        <Route path={paths.home} index element={<Home />} />
        <Route path={`${paths.profile}:id`} element={<Profile />} />
        <Route path={`${paths.userProfile}`} element={<UserProfile />} />
        <Route path={paths.topics} element={<Topics />} />
        <Route path={paths.manage} element={<Manage />} />
        <Route path={`${paths.document}:id`} element={<Document />} />
        <Route path={`${paths.userDocument}`} element={<UserDocument />} />
        <Route path={`${paths.advice}:id`} element={<Advice />} />
        <Route path={paths.degree} element={<Degree />} />
        <Route path={paths.graduates} element={<Graduates />} />
        <Route path={paths.schedule} element={<Schedule />} />
        <Route path={paths.admin} element={<Admin />} />
        <Route path={paths.userAdvice} element={<UserAdvice />} />
      </Route>
    </Routes>
  );
};
