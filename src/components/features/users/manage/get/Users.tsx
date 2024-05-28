import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Select,
  SelectItem,
  AvatarIcon,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Link
} from "@nextui-org/react";

import { columns } from "@data/users";
import { useCallback, useState } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "@/assets/icons";
import { roles } from "@/data/roles";
import userServices from "@/services/UserServices";
import { SelectRole } from "@/components/features/ui";

type User = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
};

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const Users = ({ users, setUsers }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newRoles, setNewRoles] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const sizeIcon = 20;

  const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        await userServices.deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [setUsers]
  );

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(newRoles);
    userServices
      .editUser(idEdit, { roles: newRoles })
      .then(() => {onOpenChange()})
      .catch((error) => console.error(error));
  };

  const renderCell = useCallback(
    (user: User, columnKey: React.Key) => {
      const newRoles: string[] = [];
      user.roles.map((role) =>
        roles.map((r) => r.value === role && newRoles.push(r.role))
      );

      const cellValue = user[columnKey as keyof User];

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
              name={user.fullName}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <Select
                placeholder={newRoles[0]}
                className="max-w-xs"
                color="secondary"
                variant="underlined"
                aria-label="Roles"
                classNames={{
                  base: "text-black",
                }}
              >
                {newRoles.map((role) => (
                  <SelectItem
                    key={role}
                    textValue={role}
                    isReadOnly
                    className="text-black"
                  >
                    {role}
                  </SelectItem>
                ))}
              </Select>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
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
                  onPress={() => {
                    onOpen();
                    setIdEdit(user.id);
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
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <DeleteIcon size={sizeIcon} />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDeleteUser, onOpen]
  );
  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        className="text-black"
        shadow="none"
        radius="sm"
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
          {(item: User) => (
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
                      Editar roles
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
