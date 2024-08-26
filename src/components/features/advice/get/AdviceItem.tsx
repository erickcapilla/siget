import { LayoutItem } from "@/layouts";
import { Chip, Button, Tooltip } from "@nextui-org/react";
import advisoryServices from "@/services/AdvisoryServices";
import { AdvisoryResponse } from "@/types/advisory";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
  advisory: AdvisoryResponse;
  setAdvisories: React.Dispatch<React.SetStateAction<AdvisoryResponse[]>>;
}

export const AdviceItem = ({ advisory, setAdvisories }: Props) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [signLoading, setSignLoading] = useState(false);
  const { token, role } = useAuth();

  const deleteAdvisory = () => {
    setDeleteLoading(true);
    advisoryServices
      .deleteAdvisory(token, advisory.id)
      .then(() =>
        setAdvisories((prev) => prev.filter((user) => advisory.id !== user.id))
      )
      .then(() => toast.success("Asesoría eliminada"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setDeleteLoading(false));
  };

  const signAdvisory = () => {
    setSignLoading(true);
    advisoryServices
      .signAdvisory(token, advisory.id)
      .then(response => response.json())
      .then(data => setAdvisories(prev => prev.filter(user => advisory.id !== user.id).concat(data)))
      .then(() => toast.success("Advisory Firmada"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setSignLoading(false));
  };
  return (
    <LayoutItem className="flex-col @lg:flex-row gap-3 border-l-primary">
      <section className="grid gap-5 w-full">
        <h3 className="text-primary font-bold">{advisory.reviewedTopic}</h3>
        <p className="text-sm">{advisory.observations}</p>
        <div className="flex flex-col @md:flex-row @md:justify-between @md:items-center gap-5 w-full">
          <div className="flex gap-3 items-center flex-wrap">
            <Chip size="sm" color="success" variant="flat">
              {advisory.date}
            </Chip>
            <Chip
              size="sm"
              color={advisory.isSigned ? "success" : "danger"}
              variant="flat"
            >
              {advisory.isSigned ? "Firmado" : "No firmado"}
            </Chip>
          </div>
          <div className="w-full @md:max-w-20">
            <>
              {role === "ASESOR_ROLE" && !advisory.isSigned ? (
                <Tooltip
                  content="Firmar"
                  radius="sm"
                  className="text-primary font-bold w-full"
                >
                  <Button
                    color="primary"
                    variant="ghost"
                    size="md"
                    isIconOnly
                    radius="sm"
                    className="group w-full"
                    onPress={() => {
                      toast((t) => (
                        <span>
                          ¿Estás seguro de firmar esta asesoría?
                          <Button
                            color="success"
                            size="sm"
                            variant="flat"
                            className="m-2"
                            onPress={() => {
                              signAdvisory();
                              toast.dismiss(t.id);
                            }}
                          >
                            Firmar
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            className="m-2"
                            onPress={() => {
                              toast.dismiss(t.id);
                            }}
                          >
                            Cancelar
                          </Button>
                        </span>
                      ));
                    }}
                    isLoading={signLoading} 
                  >
                    {signLoading ? "Firmando" : "Firmar"}
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip
                  content="Eliminar"
                  radius="sm"
                  className="text-primary font-bold w-full"
                >
                  <Button
                    color="primary"
                    variant="ghost"
                    size="md"
                    isIconOnly
                    radius="sm"
                    className="group w-full"
                    onPress={() => {
                      toast((t) => (
                        <span>
                          ¿Estás seguro de eliminar esta asesoria?
                          <Button
                            color="danger"
                            size="sm"
                            variant="flat"
                            className="m-2"
                            onPress={() => {
                              deleteAdvisory();
                              toast.dismiss(t.id);
                            }}
                          >
                            Eliminar
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            className="m-2"
                            onPress={() => {
                              toast.dismiss(t.id);
                            }}
                          >
                            Cancelar
                          </Button>
                        </span>
                      ));
                    }}
                    isLoading={deleteLoading}
                  >
                    {deleteLoading ? "Eliminando" : "Eliminar"}
                  </Button>
                </Tooltip>
              )}
            </>
          </div>
        </div>
      </section>
    </LayoutItem>
  );
};
