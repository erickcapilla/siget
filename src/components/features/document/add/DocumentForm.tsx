import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useAuth } from "@/hooks";
import { DocumentResponse } from "@/types/topic";
import toast from "react-hot-toast";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the File Type Validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugin with FilePond
registerPlugin(FilePondPluginFileValidateType);

interface Props {
  setDocument: React.Dispatch<React.SetStateAction<DocumentResponse[]>>;
  id: string;
}

export const DocumentForm = ({ id, setDocument }: Props) => {

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
            }/files/upload-topic?acceptedTopicId=${id}`,
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
            onload(response) {
              toast.success("Documento actualizado");
              try {
                const jsonResponse = JSON.parse(response);
                console.log(jsonResponse);
                setDocument([jsonResponse]);
                return jsonResponse;
              } catch (error) {
                console.error("Error parsing JSON response:", error);
                return null;
              } // or return 0;
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
