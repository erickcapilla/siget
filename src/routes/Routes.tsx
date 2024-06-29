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
} from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth, useUser } from "@/hooks";

export const MainRoutes = () => {
  const { isAuth } = useAuth();
  const { information } = useUser();

  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/home" />}
      >
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/reset-password/:id" element={<NewPassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute isAllowed={!!information} redirectTo="/home" />
        }
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
