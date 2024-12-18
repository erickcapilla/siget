import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";
import { DocumentResponse } from "@/types/topic";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the File Type Validation plugin
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugin with FilePond
registerPlugin(FilePondPluginFileValidateType);

interface Props {
  id: string;
  setDocument: React.Dispatch<React.SetStateAction<DocumentResponse[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditDocumentForm = ({ id, setDocument, setLoading }: Props) => {
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
            method: "PUT",
            url: `${
              import.meta.env.VITE_API_URL
            }/files/update-topic?topic-document=${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            ondata: (formData) => {
              setLoading(true);
              
              formData.delete("files");
              formData.delete("file");

              formData.append("file", files[0].file);
              return formData;
            },
            onload(response) {
              toast.success("Documento actualizado");
              try {
                const jsonResponse = JSON.parse(response);
                setDocument([jsonResponse]);
                return jsonResponse;
              } catch (error) {
                console.error("Error parsing JSON response:", error);
                return null;
              } finally {
                setLoading(false);
              }
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
