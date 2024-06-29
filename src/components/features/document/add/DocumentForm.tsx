import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import documentServices from '@/services/DocumentServices';
import { useUser } from "@/hooks";

interface Props {
  id: string;
}

export const DocumentForm = ({ id }: Props) => {
  const [files, setFiles] = useState([]);
  const {document} = useUser()

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!document[0].url) {
      documentServices.uploadFile(files[0].file, id)
        .then(() => console.log("Documento uploaded"))
        .catch(error => console.error(error))
    } else {
      documentServices.updateFile(files[0].file, document[0].id)
        .then(() => console.log("Documento actualizado"))
        .catch(error => console.error(error))
    }
  }

  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div>
        <Dropzone
          onChange={updateFiles}
          value={files}
          accept=".pdf"
          maxFiles={1}
          label="Arrastra tu archivo aquí o da click para abrir el explorador de archivos"
          localization="ES-es"
          header={false}
          style={{ fontSize: "1rem" }}
        >
          {files.map((file) => (
            <FileMosaic key={file.name} {...file} preview onDelete={removeFile} />
          ))}
        </Dropzone>
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          radius="sm"
          className="w-full"
        >
          { document[0].url ? "Nueva versión" : "Subir documento" }
        </Button>
      </div>
    </form>
  );
};
