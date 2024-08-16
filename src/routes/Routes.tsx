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
} from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth, useUser } from "@/hooks";
import { paths } from "@/utils";

export const AppRoutes = () => {
  const { isAuth } = useAuth();
  const { information } = useUser();

  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={!isAuth} redirectTo={paths.home} />}
      >
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.reset} element={<ResetPassword />} />
        <Route path={`${paths.newPassword}:id`} element={<NewPassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute isAllowed={!!information} redirectTo={paths.home} />
        }
      >
        <Route path={paths.topics} element={<Topics />} />
        <Route path={paths.manage} element={<Manage />} />
        <Route path={`${paths.profile}:id`} element={<Profile />} />
        <Route path={`${paths.document}:id`} element={<Document />} />
        <Route path={`${paths.userDocument}`} element={<UserDocument />} />
        <Route path={paths.advice} element={<Advice />} />
        <Route path={paths.degree} element={<Degree />} />
        <Route path={paths.graduates} element={<Graduates />} />
        <Route path={paths.schedule} element={<Schedule />} />
        <Route path={paths.admin} element={<Admin />} />
      </Route>

      <Route
        element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
      >
        <Route path={paths.home} index element={<Home />} />
        <Route path={`${paths.profile}:id`} element={<Profile />} />
        <Route path={`${paths.userProfile}`} element={<UserProfile />} />
        <Route path={paths.topics} element={<Topics />} />
        <Route path={paths.manage} element={<Manage />} />
        <Route path={`${paths.document}:id`} element={<Document />} />
        <Route path={`${paths.userDocument}`} element={<UserDocument />} />
        <Route path={paths.advice} element={<Advice />} />
        <Route path={paths.degree} element={<Degree />} />
        <Route path={paths.graduates} element={<Graduates />} />
        <Route path={paths.schedule} element={<Schedule />} />
        <Route path={paths.admin} element={<Admin />} />
      </Route>
    </Routes>
  );
};

/*

<Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/document/:id" element={<Document />} />
        <Route path="/advice" element={<Advice />} />
        <Route path="/degree" element={<Degree />} />
        <Route path="/graduates" element={<Graduates />} />
        <Route path="/schedule" element={<Schedule />} />
    </Routes>

<Routes>
      <Route
        element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/home" />}
      >
        <Route path="/reset" element={<ResetPassword />} />
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>


      <Route
        element={<ProtectedRoute isAllowed={!!information} redirectTo="/home" />}
      >
        <Route path="/topics" element={<Topics />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/document/:id" element={<Document />} />
        <Route path="/advice" element={<Advice />} />
        <Route path="/degree" element={<Degree />} />
        <Route path="/graduates" element={<Graduates />} />
        <Route path="/schedule" element={<Schedule />} />
      </Route>

      <Route
        element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/document/:id" element={<Document />} />
        <Route path="/advice" element={<Advice />} />
        <Route path="/degree" element={<Degree />} />
        <Route path="/graduates" element={<Graduates />} />
        <Route path="/schedule" element={<Schedule />} />
      </Route>
    </Routes>


*/
