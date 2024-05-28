import { CardUI } from "../../ui";
import { NoTopic } from "./NoTopic";

export const DocumentProgressCard = () => {
  return (
    <CardUI
      title="Mi progreso - Documento"
      footer={
        <div className="flex justify-between w-full">
          <p>
            Correcciones/sugerencias: <strong>0</strong>
          </p>
          <p>
            Última versión: <strong>{new Date().toLocaleDateString('es-mx', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</strong>
          </p>
        </div>
      }
      className="h-full w-full"
    >
      <NoTopic />
    </CardUI>
  );
};