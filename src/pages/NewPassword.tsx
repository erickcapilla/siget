import { useParams } from 'react-router-dom';
import { NewPasswordForm, Header } from "@components/features";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import logoFacultad from "@/assets/images/logoFacultad.png";

export const NewPassword = () => {
  const { id } = useParams()

  return (
    <>
      <Header handleOpenPanel={() => {}} />
      <main className="flex flex-col justify-center items-center gap-5 w-screen">
        <Card className="max-w-96 w-full" radius="sm" shadow="sm">
          <CardHeader className="flex justify-center">
            <img
              src={logoFacultad}
              alt="Logo de la facultad de ciencias básicas ingeniería y tecnología"
            />
          </CardHeader>
          <CardBody>
            <NewPasswordForm id={id} />
          </CardBody>
        </Card>
      </main>
    </>
  );
};