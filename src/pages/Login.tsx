import { Header } from "@components/features/ui";
import { LoginForm } from "@/components/features/users";

export const Login = () => {
  return (
    <>
      <Header handleOpenPanel={() => {}} />
      <main className="flex flex-col justify-center items-center gap-5 w-screen">
        <LoginForm />
      </main>
    </>
  );
};

/*
<Button
  variant="ghost"
  color="danger"
  onPress={onOpen}
  className="max-w-96 w-full"
  radius="sm"
>
  Solicitar acceso
</Button>
<Modal
  isOpen={isOpen}
  onOpenChange={onOpenChange}
  placement="center"
  className="pb-3"
>
  <ModalContent>
    {() => (
      <>
        <ModalHeader className="text-primary">
          Solicitar acceso
        </ModalHeader>
        <ModalBody>
          <AccessForm />
        </ModalBody>
      </>
    )}
  </ModalContent>
</Modal>
*/
