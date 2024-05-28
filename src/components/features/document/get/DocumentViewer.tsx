import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";
import pdf from "@/static/20206067_E2_P2.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Divider } from "@nextui-org/react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const DocumentViewer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <div className="">
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative"
      >
        <Page pageNumber={pageNumber} />
        <div className="absolute bottom-10 w-full">
          <div className="fixed bottom-8 right-20 text-gray-700">
            <div className="flex gap-3 shadow-md border-1 rounded-md px-3 py-1">
              <button onClick={() => setPageNumber(pageNumber - 1)}>
                {"<"}
              </button>
              <Divider orientation="vertical" />
              <p>
                Pag. {pageNumber} de {numPages}
              </p>
              <Divider orientation="vertical" />
              <button onClick={() => setPageNumber(pageNumber + 1)}>
                {">"}
              </button>
            </div>
          </div>
        </div>
      </Document>
    </div>
  );
};
