import type { FC } from "react";
import { Tabs } from "@vellumlabs/cexplorer-sdk";

interface DrepDetailDelegatorsTabProps {
  view: string;
}

export const DrepDetailDelegatorsTab: FC<DrepDetailDelegatorsTabProps> = ({
  view,
}) => {
  const tabs = [
    {
      key: "all_delegators",
      label: "All Delegators",
      content: <div className='p-4 text-grayTextPrimary'>All Delegators - Coming soon</div>,
      visible: true,
    },
    {
      key: "new_delegators",
      label: "New Delegators",
      content: <div className='p-4 text-grayTextPrimary'>New Delegators - Coming soon</div>,
      visible: true,
    },
    {
      key: "migrations",
      label: "Migrations",
      content: <div className='p-4 text-grayTextPrimary'>Migrations - Coming soon</div>,
      visible: true,
    },
    {
      key: "structure",
      label: "Structure",
      content: <div className='p-4 text-grayTextPrimary'>Structure - Coming soon</div>,
      visible: true,
    },
  ];

  return (
    <Tabs
      tabParam='subTab'
      items={tabs}
      withPadding={false}
      wrapperClassname='mt-0'
    />
  );
};
