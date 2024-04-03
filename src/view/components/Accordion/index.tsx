import { ReactNode, useState } from 'react';

import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AccordionProps {
  title: string;
  content: ReactNode;
  isCollapsed?: boolean;
}

export function Accordion({
  title,
  isCollapsed = false,
  content,
}: AccordionProps) {
  const [isAccordionCollapsed, setIsAccordionCollapsed] = useState(isCollapsed);

  const toggleCollapsed = () => setIsAccordionCollapsed((prev) => !prev);

  return (
    <div className="flex flex-col transition-all">
      <header
        className="flex items-center cursor-pointer justify-between p-5 hover:bg-colors-bg-grey"
        onClick={toggleCollapsed}
      >
        <p className="text-colors-text-blue font-medium text-base">{title}</p>
        {isAccordionCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </header>
      {!isAccordionCollapsed && <div className="px-5 pb-5">{content}</div>}
    </div>
  );
}
