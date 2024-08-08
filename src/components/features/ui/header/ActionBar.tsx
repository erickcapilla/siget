import {
  Navbar,
  NavbarContent,
  NavbarItem,
  User,
  Button,
  Tooltip,
  AvatarIcon,
  Spinner,
} from "@nextui-org/react";
import { MenuIcon } from "@/components/icons";
import { useUser } from "@/hooks";
import { roleNames, roleColors } from "@/utils/utils";

interface Props {
  handleOpenPanel: (type?: string) => void;
}

export const ActionBar = ({ handleOpenPanel }: Props) => {
  const { userRoles, role, information, isLoading } = useUser();
  const name = information
    ? `${information.name.split(" ")[0]} ${information.fatherLastName}`
    : "Usuario";

  return (
    <>
      {isLoading ? (
        <Spinner color="secondary" size="sm" />
      ) : (
        <Navbar
          className="bg-primary font-semibold text-xs w-auto text-white"
          classNames={{ wrapper: "px-0 gap-2" }}
        >
          <NavbarContent className="gap-2">
            <NavbarItem className="cursor-pointer ml-0 max-sm:hidden">
              <User
                name={name}
                description={roleNames[role as keyof typeof roleNames]}
                avatarProps={{
                  showFallback: false,
                  fallback: <AvatarIcon />,
                  size: "sm",
                  isBordered: true,
                  color: "warning",
                  classNames: {
                    base: `bg-[${
                      roleColors[
                        userRoles && (userRoles[0] as keyof typeof roleColors)
                      ]
                    }]`,
                    fallback: `text-white w-full`,
                  },
                }}
                classNames={{
                  description: "text-xs text-warning",
                }}
              />
            </NavbarItem>
            <Tooltip content="Menú">
              <NavbarItem>
                <Button
                  radius="full"
                  isIconOnly
                  className="bg-transparent p-0 w-auto h-auto"
                  onPress={() => handleOpenPanel("menu")}
                >
                  <MenuIcon size={25} />
                </Button>
              </NavbarItem>
            </Tooltip>
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
};
