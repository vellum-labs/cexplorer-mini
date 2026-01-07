import type { FC } from "react";

import { AdaWithTooltip, OverviewCard } from "@vellumlabs/cexplorer-sdk";

export const EpochLostAndCost: FC = () => {
  const overviewList = [
    {
      label: "Size of all blocks in epoch",
      value: <p className='text-text-sm font-medium'>185.78 MB</p>,
    },
    {
      label: "Price per MB",
      value: <AdaWithTooltip data={430000} />,
    },
    {
      label: "Average TX size",
      value: <p className='text-text-sm font-medium'>2.3kb</p>,
    },
    {
      label: "Average Block Size",
      value: <p className='text-text-sm font-medium'>33.2kb</p>,
    },
    {
      label: "Max Block Size",
      value: <p className='text-text-sm font-medium'>88kb</p>,
    },
    {
      label: "",
      value: (
        <div className='flex items-center gap-1.5'>
          <div className='relative h-2 w-full overflow-hidden rounded-[4px] bg-[#FEC84B]'>
            <span
              className='absolute left-0 block h-2 rounded-bl-[4px] rounded-tl-[4px] bg-[#47CD89]'
              style={{
                width: `${80}%`,
              }}
            ></span>
          </div>
          <span className='text-text-sm font-medium text-grayTextPrimary'>
            80%
          </span>
        </div>
      ),
    },
  ];

  return (
    <OverviewCard
      title='Load and Cost'
      overviewList={overviewList}
      labelClassname='md:text-nowrap h-full'
    />
  );
};
