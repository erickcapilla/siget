import { SendEmailForm, CardInfo } from "@components/features";
import { paths } from "@/utils";
import { LayoutForm } from "@/layouts";

export const ResetPassword = () => {
  return (
    <LayoutForm footer="Iniciar sesión" href={paths.login}>
      <SendEmailForm />
      <div className="mt-5">
        <CardInfo
          title="¿Necesitas ayuda?"
          description="Ingresa tú correo electrónico vinculada a tu cuenta del SIGET y te enviaremos un enlace para restablecer tu contraseña."
          color="warning"
        />
      </div>
    </LayoutForm>
  );
};
