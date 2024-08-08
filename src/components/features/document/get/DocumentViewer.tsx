import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";
//import pdf from "@/static/20206067_E2_P2.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { DocumentUrl } from "@/types";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  document: DocumentUrl;
}

export const DocumentViewer = ({ document }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file={document.url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative"
      >
        <Page pageNumber={pageNumber} />
        <div className="absolute bottom-10 w-full">
          <div className="fixed bottom-8 right-32 text-gray-700">
            <div className="flex gap-3 shadow-md border-1 rounded-md px-3 py-1 items-center">
              <Button
                isIconOnly
                onPress={() => setPageNumber(pageNumber - 1)}
                className="bg-transparent"
                isDisabled={pageNumber === 1}
              >
                <ArrowLeft color="#3F3F46" />
              </Button>
              <p>
                Pag. {pageNumber} de {numPages}
              </p>
              <Button
                isIconOnly
                onPress={() => setPageNumber(pageNumber + 1)}
                className="bg-transparent"
                isDisabled={pageNumber === numPages}
              >
                <ArrowRight color="#3F3F46" />
              </Button>
            </div>
          </div>
        </div>
      </Document>
    </div>
  );
};
