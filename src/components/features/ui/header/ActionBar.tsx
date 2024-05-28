import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Badge,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Tooltip,
  AvatarIcon,
} from "@nextui-org/react";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BellIcon, ChatIcon, MenuIcon } from "@icons/index";
import { useUser } from "@/hooks";
import { roleNames, roleColors } from "@/utils/utils";

interface Props {
  handleOpenPanel: (type?: string) => void;
}

export const ActionBar = ({ handleOpenPanel }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { userRoles, role, information } = useUser();
  const name = information ? `${information.name.split(" ")[0]} ${information.fatherLastName}` : "Usuario";

  return (
    <Navbar
      className="bg-primary font-semibold text-xs w-auto text-white"
      classNames={{ wrapper: "px-0 gap-2" }}
    >
      <NavbarContent className="gap-0">
        <NavbarItem>
          <Badge
            color="danger"
            content={5}
            isInvisible={false}
            shape="circle"
            showOutline={false}
            size="sm"
            className="mr-2"
          >
            <Tooltip content="Notificaciones">
              <Button
                radius="full"
                isIconOnly
                className="bg-transparent p-0 w-auto h-auto"
                onPress={() => {
                  handleOpenPanel("notifications");
                }}
              >
                <BellIcon size={25} />
              </Button>
            </Tooltip>
          </Badge>
        </NavbarItem>
        <NavbarItem>
          <Badge
            color="danger"
            content={2}
            isInvisible={false}
            shape="circle"
            showOutline={false}
            size="sm"
            className="mr-2"
          >
            <Tooltip content="Mensajes">
              <Button
                radius="full"
                isIconOnly
                className="bg-transparent p-0 w-auto h-auto"
                onPress={() => {
                  handleOpenPanel("messages");
                }}
              >
                <ChatIcon size={25} />
              </Button>
            </Tooltip>
          </Badge>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="gap-2">
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
        <NavbarItem className="cursor-pointer ml-0 max-sm:hidden">
          <Dropdown radius="sm" showArrow>
            <DropdownTrigger>
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
                    base: `bg-[${roleColors[userRoles[0] as keyof typeof roleColors]}]`,
                    fallback: `text-white w-full`,
                  },
                }}
                classNames={{
                  description: "text-xs text-warning",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                key === "logout" ? logout() : navigate("/profile");
              }}
              aria-label="Menu"
            >
              <DropdownSection showDivider>
                <DropdownItem textValue="profile">
                  <Link href="/profile">Perfil</Link>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="logout" color="danger" textValue="logout">
                  Cerrar sesión
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
