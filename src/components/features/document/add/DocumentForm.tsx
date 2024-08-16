import { useState } from "react";
import documentServices from "@/services/DocumentServices";
import { FilePond, registerPlugin } from "react-filepond";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the File Type Validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugin with FilePond
registerPlugin(FilePondPluginFileValidateType);

interface Props {
  id: string;
}

export const DocumentForm = ({ id }: Props) => {
  const [files, setFiles] = useState([]);
  const { token } = useAuth();

  const uploadFile = () => {
    documentServices
      .uploadFile(token, files[0].file, id)
      .then(() => console.log("Documento uploaded"))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <FilePond
        acceptedFileTypes={["application/pdf"]}
        files={files}
        onupdatefiles={setFiles}
        maxFiles={1}
        instantUpload={false}
        server={{
          process: {
            url: `${
              import.meta.env.VITE_API_URL
            }/files/upload-topic?acceptedTopicId=${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            ondata: (formData) => {
              formData.append("file", files[0].file);
              return formData;
            },
          },
        }}
        onprocessfilestart={() => uploadFile()}
        labelInvalidField="Asegurate que tu archivo sea PDF"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Arrastra tu archivo aquí o <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
