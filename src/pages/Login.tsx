import { LayoutForm } from "@/layouts";
import { LoginForm, CardInfo } from "@/components/features";
import { paths } from "@/utils";

export const Login = () => {
  return (
    <>
      
      <LayoutForm footer="¿Olvidaste tu contraseña?" href={paths.reset}>
        <LoginForm />
        <div className="mt-5">
          <CardInfo
            title="¿No tienes cuenta o necesitas ayuda?"
            description="Consulta los administradores de la plataforma, en caso de que seas estudiante y necesites una cuenta solicítala a tu profesor (titular de materia)."
            color="warning"
          />
        </div>
      </LayoutForm>
    </>
  );
};
