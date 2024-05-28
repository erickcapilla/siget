import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export const DocumentForm = () => {
  const [files, setFiles] = useState([]);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  return (
    <form className="flex flex-col justify-between h-full">
      <div>
        <Dropzone onChange={updateFiles} value={files}>
          {files.map((file) => (
            <FileMosaic {...file} preview />
          ))}
        </Dropzone>
      </div>
      <div>
        <Button type="submit" color="primary" variant="solid" radius="sm" className="w-full">
          Agregar versión
        </Button>
      </div>
    </form>
  );
};
