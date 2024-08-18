import { usePDFSlick } from "@pdfslick/react";
import PDFNavigation from "./PDFNavigation";

import "@pdfslick/react/dist/pdf_viewer.css";

type PDFViewerAppProps = {
  pdfFilePath: string;
};

export const DocumentViewer = ({ pdfFilePath }: PDFViewerAppProps) => {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(
    pdfFilePath,
    {
      singlePageViewer: true,
    }
  );

  return (
    <div className="absolute inset-0 pdfSlick">
      <div className="flex-1 relative h-full">
        <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
        <PDFNavigation {...{ usePDFSlickStore }} />
      </div>
    </div>
  );
};