import { ProgressBar, Step } from "@/components/features";
import { Check } from "@/components/icons/Check";
import { Button } from "@nextui-org/react";

export const DegreeProgressBar = () => {
  return (
    <ProgressBar
      percent={0}
      filledBackground="#45D483"
      unfilledBackground="#D4D4D8"
    >
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-6">
            <Button isIconOnly className="bg-transparent">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            </Button>
            <p className="text-primary text-sm font-bold ml-4">Solicitado</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-10">
            <Button isIconOnly className="bg-transparent">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            </Button>
            <p className="text-primary text-sm font-bold">Solicitado</p>
          </div>
        )}
      </Step>
      <Step transition="scale" accomplished index={0} position={0}>
        {({ accomplished }) => (
          <div className="flex flex-col gap-1 items-center justify-center mt-5 ml-[-25px]">
            <Button isIconOnly className="bg-transparent">
              <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
            </Button>
            <p className="text-primary text-sm font-bold mr-5">Solicitado</p>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};
