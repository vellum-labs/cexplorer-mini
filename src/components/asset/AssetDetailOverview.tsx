import type { FC } from "react";

import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { TimeDateIndicator } from "@vellumlabs/cexplorer-sdk/TimeDateIndicator";

export const AssetDetailOverview: FC = () => {
  const overview = [
    {
      label: "Name",
      value: (
        <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
          <p className='break-words break-all'>
            {formatString("Asset", "long")}
          </p>
        </span>
      ),
    },
    {
      label: "Encoded Name",
      value: (
        <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
          <p className='break-words break-all'>
            {formatString("Asset", "long")}
          </p>
        </span>
      ),
    },
    {
      label: "Policy ID",
      value: (
        <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
          <p className='break-words break-all'>
            {formatString("Asset", "long")}
          </p>
        </span>
      ),
    },
    {
      label: "Asset ID",
      value: (
        <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
          <p className='break-words break-all'>
            {formatString("Asset", "long")}
          </p>
        </span>
      ),
    },
  ];

  const blockchain = [
    {
      label: "Owner",
      value: (
        <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
          <p className='break-words break-all'>
            {formatString("Asset", "long")}
          </p>
        </span>
      ),
    },
    {
      label: "Supply",
      value: 1,
    },
    {
      label: "First mint",
      value: <TimeDateIndicator time='2026-01-04T21:44:52' />,
    },
    {
      label: "Mint count",
      value: 5,
    },
    {
      label: "Metadata standard",
      value: "-",
    },
  ];

  return (
    <section className='flex w-full flex-col gap-1.5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex-grow basis-[390px] md:flex-shrink-0'>
          <OverviewCard
            title='Overview'
            overviewList={overview}
            labelClassname='min-w-[135px] text-nowrap'
            className='md:h-full'
          />
        </div>
        <div className='flex-grow basis-[350px] md:flex-shrink-0'>
          <OverviewCard
            title='Blockchain'
            overviewList={blockchain}
            labelClassname='text-nowrap min-w-[160px]'
            className='h-full'
          />
        </div>
      </div>
    </section>
  );
};
