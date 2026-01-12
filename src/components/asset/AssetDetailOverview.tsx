import type { FC } from "react";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk";

interface AssetDetailOverviewProps {
  data: any;
  type: "nft" | "token";
  formattedHex?: string;
  isLoading?: boolean;
  hasDex?: boolean;
  assetName?: string;
}

export const AssetDetailOverview: FC<AssetDetailOverviewProps> = ({
  data,
  type,
  isLoading,
  formattedHex,
  hasDex,
  assetName,
}) => {
  const overview = [];
  const blockchain = [];
  const tokenRegistry = [];

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
        <div className='flex-grow basis-[328px] md:flex-shrink-0'>
          <OverviewCard
            title='Token Registry'
            overviewList={tokenRegistry}
            labelClassname='text-nowrap min-w-[160px]'
            className='h-full'
          />
        </div>
      </div>
    </section>
  );
};
