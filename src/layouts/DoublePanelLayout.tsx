import { LayoutMain } from "./LayoutMain";
import { Panel } from "@/components/features";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
  titleLeft: string;
  subtitleLeft: string;
  title: string;
  contentLeft: React.ReactNode;
}

export const DoublePanelLayout = ({
  children,
  titleLeft,
  subtitleLeft,
  title,
  contentLeft,
}: Props) => {
  return (
    <LayoutMain>
      <div className="flex max-lg:flex-col gap-3 h-full">
        <div className="max-lg:hidden h-full min-w-80 max-w-[345px] w-full">
          <Panel className="min-w-60 max-w-[360px]" title={titleLeft}>
            {contentLeft}
          </Panel>
        </div>
        <div className="lg:hidden h-auto">
          <Accordion
            variant="shadow"
            itemClasses={{
              title: "text-primary font-bold",
              subtitle: "text-gray-500",
            }}
          >
            <AccordionItem
              title={titleLeft}
              aria-label="Accordion form"
              subtitle={subtitleLeft}
            >
              {contentLeft}
            </AccordionItem>
          </Accordion>
        </div>
        <div className="@container w-full h-full md:min-w-[600px] overflow-y-auto">
          <Panel title={title} className="border border-gray-300 shadow-md">{children}</Panel>
        </div>
      </div>
    </LayoutMain>
  );
};
