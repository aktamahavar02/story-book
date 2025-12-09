import * as Accordion from "@radix-ui/react-accordion";
import { IoChevronDownOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";

type AccordionItemProps = {
  type: string;
  title: string;
  isAdmin?: boolean;
  extra?: React.ReactNode | string;
  content: string | React.ReactNode;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  type,
  title,
  content,
  extra,
  isAdmin
}) => {
  return (
<Accordion.Item value={type} className={` ${isAdmin ?"mt-0":"mt-[24px]"  } `}>
  <Accordion.Header>
    <Accordion.Trigger
      className={cn(
        "group flex w-full items-center justify-between py-2 text-left text-lg font-figTree font-medium text-black border-b border-gray-300",
        "transition-all"
      )}
    >
      {title}
      <IoChevronDownOutline
        className="ml-2  text-[#6b727f] h-4 w-4 flex-shrink-0 origin-center will-change-transform transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>

  <Accordion.Content className="pt-2  text-gray-600  text-base font-figTree t overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
    {content}
  </Accordion.Content>

  {extra && (
    <Accordion.Content className="py-4 text-base font-figTree text-gray-600  overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down font-normal">
      {extra}
    </Accordion.Content>
  )}
</Accordion.Item>

  );
};
