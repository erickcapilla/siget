import type { DocumentResponse } from '@/types/topic';
import { ProgressBar, Step } from "@components/features";
import { Check } from "@/components/icons/Check";
import { stepPercentage } from "@/utils/utils";

interface Props {
  document: DocumentResponse[];
}

export const ProgressDocumentBar = ({ document }: Props) => {
  const percent = () => {
    let number = 0
    if (document[0].chapter1) number = stepPercentage["1"]
    if (document[0].chapter2) number = stepPercentage["2"]
    if (document[0].chapter3) number = stepPercentage["3"]
    if (document[0].chapter4) number = stepPercentage["4"]
    if (document[0].chapter5) number = stepPercentage["5"]
    if (document[0].chapter6) number = stepPercentage["6"]
    if (document[0].chapter7) number = stepPercentage["7"]
    return number
  }
  return (
    <ProgressBar
      percent={percent()}
      filledBackground="#45D483"
      unfilledBackground="#D4D4D8"
    >
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-6">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold ml-4">1</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-10">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold">2</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-10">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold">3</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-10">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold">4</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-10">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold">5</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-10">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold">6</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            <p className="text-secondary text-sm font-bold w-20 text-center">7</p>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};