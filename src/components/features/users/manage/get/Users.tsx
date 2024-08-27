import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  AvatarIcon,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Link,
  Chip,
} from "@nextui-org/react";

import { columns } from "@data/users";
import { useState } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "@/components/icons";
import { roles } from "@/data/roles";
import userServices from "@/services/UserServices";
import { SelectRole } from "@/components/features/ui";
import { UsersResponse } from "@/types/user";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";

interface Props {
  users: UsersResponse[];
  setUsers: React.Dispatch<React.SetStateAction<UsersResponse[]>>;
}

export const Users = ({ users, setUsers }: Props) => {
  const { token } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newRoles, setNewRoles] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const sizeIcon = 20;
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [editIsLoading, setEditIsLoading] = useState(false);

  const handleDeleteUser = (id: string) => {
    setDeleteIsLoading(true);
    userServices
      .deleteUser(token, id)
      .then(() => toast.success("Usuario eleminado"))
      .then(() => setUsers((prev) => prev.filter((user) => user.id !== id)))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setDeleteIsLoading(false));
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setEditIsLoading(true);

    userServices
      .editUser(token, idEdit, { roles: newRoles })
      .then(() => {
        onOpenChange();
        toast.success(
          "Editado correctamente (si no ves cambios recarga la página)"
        );
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setEditIsLoading(false));
  };

  const renderCell = (user: UsersResponse, columnKey: React.Key) => {
    const newRoles: string[] = [];
    user.roles.map((role) =>
      roles.map((r) => r.value === role && newRoles.push(r.role))
    );

    const cellValue = user[columnKey as keyof UsersResponse];
    const userName = user.userInformation
      ? `${user.userInformation.name.split(" ")[0]} ${
          user.userInformation.fatherLastName
        }`
      : "Usuario";

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              fallback: <AvatarIcon />,
              classNames: {
                fallback: "text-white w-full",
              },
            }}
            description={user.email}
            name={userName}
            classNames={{
              name: "font-semibold",
            }}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex gap-2 flex-wrap">
            {newRoles.map((role) => (
              <Chip key={role} size="sm" variant="flat" color="primary" radius="sm">
                {role}
              </Chip>
            ))}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-1">
            <Tooltip content="Perfil">
              <Button
                as={Link}
                radius="full"
                isIconOnly
                className="bg-transparent p-0 w-auto h-auto text-default-500"
                href={`/profile/${user.id}`}
              >
                <EyeIcon size={sizeIcon} />
              </Button>
            </Tooltip>
            <Tooltip content="Editar usuario">
              <Button
                radius="full"
                isIconOnly
                className="bg-transparent p-0 w-auto h-auto text-default-500"
                isLoading={editIsLoading}
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de editar los roles de <b>{userName}</b>?
                      <Button
                        color="success"
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          onOpen();
                          setIdEdit(user.id);
                          toast.dismiss(t.id);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancelar
                      </Button>
                    </span>
                  ));
                }}
              >
                <EditIcon size={sizeIcon} />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Borrar usuario">
              <Button
                radius="full"
                isIconOnly
                className="bg-transparent p-0 w-auto h-auto text-danger"
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de eliminar a <b>{userName}</b>?
                      <Button
                        color="danger"
                        variant="flat"
                        size="sm"
                        className="m-2"
                        onPress={() => {
                          handleDeleteUser(user.id);
                          toast.dismiss(t.id);
                        }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="flat"
                        size="sm"
                        className="m-2"
                        onPress={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancelar
                      </Button>
                    </span>
                  ));
                }}
                isLoading={deleteIsLoading}
              >
                <DeleteIcon size={sizeIcon} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as React.ReactNode;
    }
  };

  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        shadow="none"
        radius="sm"
        isHeaderSticky
        isStriped
        classNames={{
          base: "size-full overflow-scroll",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item: UsersResponse) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="pb-3"
      >
        <ModalContent>
          {() => (
            <>
              <ModalContent>
                <ModalHeader className="text-primary">Nuevos roles</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit} className="grid gap-3">
                    <SelectRole
                      onChange={(e) => {
                        const role = e?.target.value;
                        const roles = role ? role.split(",") : [];
                        setNewRoles(roles);
                      }}
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="solid"
                      radius="sm"
                    >
                      Guardar roles
                    </Button>
                  </form>
                </ModalBody>
              </ModalContent>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
