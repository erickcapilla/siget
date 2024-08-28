import userServices from "@/services/UserServices";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { TopicUser } from "@/types/user";
import { useParams } from "react-router-dom";
import { DoublePanelLayout } from "@/layouts";
import { UserDetails } from "@/components/features";

export const Profile = () => {
  const [user, setUser] = useState<TopicUser>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    userServices
      .getUser(token, id)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DoublePanelLayout
      title="Perfil"
      titleLeft="Detalles"
      subtitleLeft="Presiona para ver detalles del usuario"
      contentLeft={
        <>
          {loading ? (
            <Spinner />
          ) : user ? (
            <UserDetails user={user} />
          ) : (
            <h1>Usuario no encontrado</h1>
          )}
        </>
      }
    >
      {loading ? (
        <Spinner />
      ) : user ? (
        <h1>{user?.userInformation?.name}</h1>
      ) : (
        <h1>Usuario no encontrado</h1>
      )}
    </DoublePanelLayout>
  );
};
