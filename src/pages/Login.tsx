import { Header } from "@components/features/ui";
import { LoginForm } from "@/components/features";

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