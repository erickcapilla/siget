import { useParams } from "react-router-dom";
import { NewPasswordForm, CardInfo } from "@components/features";
import { LayoutForm } from "@/layouts";
import { paths } from "@/utils";

export const NewPassword = () => {
  const { id } = useParams();

  return (
    <LayoutForm footer="Iniciar sesión" href={paths.login}>
      <NewPasswordForm id={id} />
      <div className="mt-5">
        <CardInfo
          title="¿Necesitas ayuda?"
          description="Ingresa tu nueva contraseña y vuelve a ingresar al sitema con tu nueva contraseña."
          color="warning"
        />
      </div>
    </LayoutForm>
  );
};
