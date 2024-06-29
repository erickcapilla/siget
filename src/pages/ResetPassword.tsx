import { SendEmailForm, Header } from "@components/features";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import logoFacultad from "@/assets/images/logoFacultad.png";

export const ResetPassword = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center gap-5 w-screen">
        <Card className="max-w-96 w-full" radius="sm" shadow="sm">
          <CardHeader className="flex justify-center">
            <img
              src={logoFacultad}
              alt="Logo de la facultad de ciencias básicas ingeniería y tecnología"
            />
          </CardHeader>
          <CardBody>
            <SendEmailForm />
          </CardBody>
        </Card>
      </main>
    </>
  );
};
