import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";
import logoFacultad from "@images/logoFacultad.png";

import { Header } from "@components/features/ui";

interface Props {
  children: React.ReactNode;
  href: string;
  footer: string;
}

export const LayoutForm = ({ children, footer, href }: Props) => {
  return (
    <>
      <Header isOpen={false} />
      <main className="flex flex-col items-center gap-5 w-screen px-5 pt-10">
        <Card className="max-w-md w-full" radius="sm" shadow="sm">
          <CardHeader className="flex justify-center">
            <img
              src={logoFacultad}
              alt="Logo de la facultad de ciencias básicas ingeniería y tecnología"
            />
          </CardHeader>
          <CardBody>{children}</CardBody>
          <CardFooter className="flex justify-center">
            <Link href={href} color="secondary" underline="always">
              {footer}
            </Link>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};
