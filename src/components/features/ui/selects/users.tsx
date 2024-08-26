import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";
import userServices from "@/services/UserServices";
import { UsersResponse } from "@/types/user";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";

interface Props {
  onChange?: (key: React.Key | null) => void;
}

export const UsersSelect = ({ onChange }: Props) => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    userServices
      .getUsers(token)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Autocomplete
      items={users}
      label="Selecciona un usuario"
      variant="bordered"
      color="primary"
      placeholder="Selecciona un usuario"
      onSelectionChange={onChange}
    >
      {(user) => (
        <AutocompleteItem
          key={user.id}
          textValue={
            user.userInformation
              ? user.userInformation.name +
                " " +
                user.userInformation.fatherLastName
              : "Usuario"
          }
          value={user.id}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              className="flex-shrink-0"
              size="sm"
              icon={<AvatarIcon />}
              classNames={{
                icon: "text-white",
              }}
            />
            <div className="flex flex-col">
              <span className="text-small">
                {user.userInformation
                  ? user.userInformation.name +
                    " " +
                    user.userInformation.fatherLastName
                  : "Usuario"}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
