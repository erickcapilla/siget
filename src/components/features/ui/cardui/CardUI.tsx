import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

interface Props {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const CardUI = ({ title, children, footer, className}: Props) => {
  return (
    <>
      <Card className={ className } shadow="sm" radius="sm">
        <CardHeader className="text-primary font-bold">
          { <h3> { title.toUpperCase() } </h3> }
        </CardHeader>
        <CardBody className="px-4" > {children} </CardBody>
        { footer && <CardFooter className="text-gray-500 text-xs">{ footer }</CardFooter> }
      </Card>
    </>
  );
};