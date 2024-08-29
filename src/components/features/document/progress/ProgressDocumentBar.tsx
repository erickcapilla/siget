import type { DocumentResponse } from "@/types/topic";
import { ProgressBar, Step } from "@components/features";
import { Check } from "@/components/icons/Check";
import { chapters } from "@/data/chapters";

interface Props {
  document: DocumentResponse[];
  type: string;
}

export const ProgressDocumentBar = ({ document, type }: Props) => {
  return (
    <ProgressBar
      percent={document[0].chapters}
      filledBackground="#45D483"
      unfilledBackground="#D4D4D8"
    >
      {chapters[type].chapters.map((chapter) => (
        <Step key={chapter} transition="scale" accomplished index={0} position={0}>
          {({ accomplished }) => (
            <div className="flex flex-col gap-1 items-center justify-center mt-5">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
              <p className="text-secondary text-sm font-bold">{chapter}</p>
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
};
