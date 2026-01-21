import type { FC } from "react";
import type { AdaPots } from "@/services/epoch";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { Tooltip } from "@vellumlabs/cexplorer-sdk/Tooltip";

interface EpochPotsProps {
  adaPots?: AdaPots;
}

export const EpochPots: FC<EpochPotsProps> = ({ adaPots }) => {
  const totalDeposits =
    (adaPots?.deposits_stake ?? 0) +
    (adaPots?.deposits_drep ?? 0) +
    (adaPots?.deposits_proposal ?? 0);

  const feesReservesPercentage =
    adaPots?.fees && adaPots?.reserves
      ? Math.round((adaPots.fees / (adaPots.fees + adaPots.reserves)) * 100)
      : 0;

  const overviewList = [
    {
      label: "Treasury",
      value: (
        <p className='text-text-sm font-medium'>
          {adaPots?.treasury ? <AdaWithTooltip data={adaPots.treasury} /> : "-"}
        </p>
      ),
    },
    {
      label: "Reserves",
      value: (
        <p className='text-text-sm font-medium'>
          {adaPots?.reserves ? <AdaWithTooltip data={adaPots.reserves} /> : "-"}
        </p>
      ),
    },
    {
      label: "Rewards",
      value: (
        <p className='text-text-sm font-medium'>
          {adaPots?.rewards ? <AdaWithTooltip data={adaPots.rewards} /> : "-"}
        </p>
      ),
    },
    {
      label: "Deposits",
      value: (
        <p className='text-text-sm font-medium'>
          {totalDeposits > 0 ? <AdaWithTooltip data={totalDeposits} /> : "-"}
        </p>
      ),
    },
    {
      label: "Fees",
      value: (
        <p className='text-text-sm font-medium'>
          {adaPots?.fees ? <AdaWithTooltip data={adaPots.fees} /> : "-"}
        </p>
      ),
    },
    {
      label: (
        <Tooltip content='Portion of staking rewards coming from fees vs reserves'>
          <span className='cursor-help'>Fees / Reserves</span>
        </Tooltip>
      ),
      value: <p className='text-text-sm font-medium'>{feesReservesPercentage}%</p>,
    },
  ];

  return (
    <div className='flex flex-grow basis-[410px] items-stretch md:flex-shrink-0'>
      <OverviewCard title='Pots' overviewList={overviewList} />
    </div>
  );
};
