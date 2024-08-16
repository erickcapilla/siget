import { DoublePanelLayout } from "@/layouts";
import {
  DocumentForm,
  DocumentViewer,
  CommentList,
  CommentForm,
} from "@/components/features";
import { useUser, useAuth } from "@/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import documentServices from "@/services/DocumentServices";
import { CommentResponse } from "@/types";

export const UserDocument = () => {
  const { token, userAuthed } = useAuth();
  //const [comments, setComments] = useState<CommentResponse>();
  //const [document, setDocument] = useState();

  useEffect(() => {
    documentServices
      .getUserDocuments(token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [])


  return (
    <DoublePanelLayout
      title="Documento"
      contentLeft={<DocumentForm id={userAuthed} />}
      subtitleLeft="Presiona para ver comentarios o agregar nueva versión"
      titleLeft="Comentarios"
    >
      <h1>Hola</h1>
    </DoublePanelLayout>
  );
};