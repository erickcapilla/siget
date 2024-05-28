import { Layout } from "@/components/layouts/Layout";
import { Panel } from "@/components/features/ui";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { AddUserForm, Users } from "@/components/features/users/manage";
import { useUser } from "@/hooks";
import { useState, useEffect } from "react";
import userServices from "@/services/UserServices";

type User = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
};

export const Manage = () => {
  const { role } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      userServices
        .getUsers()
        .then((res) => res.json())
        .then((data) => setUsers(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Layout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel
          title={
            role === "ADMIN_ROLE" ? "Agregar usuario" : "Agregar estudiante"
          }
        >
          <AddUserForm setUsers={setUsers} />
        </Panel>
      </div>
      <div className="min-[640px]:hidden h-auto">
        <Accordion
          variant="shadow"
          itemClasses={{
            title: "text-primary font-bold",
            subtitle: "text-gray-500",
          }}
        >
          <AccordionItem
            title={
              role === "ADMIN_ROLE" ? "Agregar usuario" : "Agregar estudiante"
            }
            aria-label="Accordion form"
            subtitle={
              role === "ADMIN_ROLE"
                ? "Presiona para agregar usuario"
                : "Presiona para agregar estudiante"
            }
          >
            <AddUserForm setUsers={setUsers} />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title={role === "ADMIN_ROLE" ? "Usuarios" : "Mis estudiantes"}>
          <Users users={users} setUsers={setUsers} />
        </Panel>
      </div>
    </Layout>
  );
};
