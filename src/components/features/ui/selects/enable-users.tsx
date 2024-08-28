import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";
import userServices from "@/services/UserServices";
import { EnableUserResponse } from "@/types/user";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";

interface Props {
  onChange?: (key: React.Key | null) => void;
}

export const EnableUsersSelect = ({ onChange }: Props) => {
  const [users, setUsers] = useState<EnableUserResponse[]>([]);
  const { token, user } = useAuth();
  
  useEffect(() => {
    const degrees = user?.userDegreePrograms.map(degree => degree.id);
    console.log(degrees);
    userServices
      .enableUsers(token, [ "f63edffb-fb4e-409f-b668-86da2a7c6948", "10ccec3a-e36c-4787-b94f-45aec0c387fb" ])
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Autocomplete
      items={users}
      label="Selecciona un colaborador (opcional)"
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
