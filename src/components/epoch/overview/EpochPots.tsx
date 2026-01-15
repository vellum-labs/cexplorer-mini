import type { FC } from "react";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { Tooltip } from "@vellumlabs/cexplorer-sdk/Tooltip";

export const EpochPots: FC = () => {
  const overviewList = [
    {
      label: "Treasury",
      value: (
        <p className='text-text-sm font-medium'>
          <AdaWithTooltip data={850000} />
        </p>
      ),
    },
    {
      label: "Reserves",
      value: (
        <p className='text-text-sm font-medium'>
          <AdaWithTooltip data={450000} />
        </p>
      ),
    },
    {
      label: "Rewards",
      value: (
        <p className='text-text-sm font-medium'>
          <AdaWithTooltip data={85023} />
        </p>
      ),
    },
    {
      label: "Deposits",
      value: (
        <p className='text-text-sm font-medium'>
          <AdaWithTooltip data={456031} />
        </p>
      ),
    },
    {
      label: "Fees",
      value: (
        <p className='text-text-sm font-medium'>
          <AdaWithTooltip data={789797} />
        </p>
      ),
    },
    {
      label: (
        <Tooltip content='Portion of staking rewards coming from fees vs reserves'>
          <span className='cursor-help'>Fees / Reserves</span>
        </Tooltip>
      ),
      value: <p className='text-text-sm font-medium'>{80}%</p>,
    },
  ];

  return (
    <div className='flex flex-grow basis-[410px] items-stretch md:flex-shrink-0'>
      <OverviewCard title='Pots' overviewList={overviewList} />
    </div>
  );
};
