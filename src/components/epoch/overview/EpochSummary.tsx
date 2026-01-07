import type { FC } from "react";

import {
  AdaWithTooltip,
  formatNumber,
  OverviewCard,
  PulseDot,
  TimeDateIndicator,
} from "@vellumlabs/cexplorer-sdk";

export const EpochSummary: FC = () => {
  const overviewList = [
    {
      label: "Beginning",
      value: <TimeDateIndicator time='2026-01-04T21:44:52' />,
    },
    {
      label: "End",
      value: <TimeDateIndicator time='2026-01-07T19:22:19' />,
    },
    {
      label: "Blocks",
      value: <p className='text-text-sm font-medium'>{formatNumber(12462)}</p>,
    },
    {
      label: "Transactions",
      value: <p className='text-text-sm font-medium'>{formatNumber(99683)}</p>,
    },
    {
      label: "Fees Generated",
      value: (
        <p className='text-text-sm font-medium'>
          <AdaWithTooltip data={32438087827} />
        </p>
      ),
    },
    {
      label: "TPS:",
      value: (
        <p className='text-text-sm font-medium'>
          {2.74} (used) / {(4.89).toFixed(2)} (cap)
        </p>
      ),
    },
  ];

  return (
    <OverviewCard
      title='Summary'
      subTitle={
        <div className='relative flex h-[24px] w-[115px] items-center justify-end rounded-m border border-border px-[10px]'>
          <div className='absolute left-2'>
            <PulseDot />
          </div>
          <span className='text-text-xs font-medium'>Current Epoch</span>
        </div>
      }
      overviewList={overviewList}
    />
  );
};
