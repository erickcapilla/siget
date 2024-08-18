import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useAuth } from "@/hooks";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the File Type Validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugin with FilePond
registerPlugin(FilePondPluginFileValidateType);

interface Props {
  id: string;
}

export const EditDocumentForm = ({ id }: Props) => {
  const [files, setFiles] = useState([]);
  const { token } = useAuth();

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
            }/files/update-topic?topic-document=${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            ondata: (formData) => {
              formData.delete("files");
              formData.delete("file");
              
              formData.append("file", files[0].file);
              console.log(formData);
              return formData;
            },
          },
        }}
        labelInvalidField="Asegurate que tu archivo sea PDF"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Arrastra tu archivo aquí o <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
