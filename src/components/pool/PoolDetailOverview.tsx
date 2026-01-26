import type { FC } from "react";
import type { PoolDetailData } from "@/services/pool";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";

interface PoolDetailOverviewProps {
  poolDetail: PoolDetailData | undefined;
  isLoading?: boolean;
}

export const PoolDetailOverview: FC<PoolDetailOverviewProps> = ({
  poolDetail,
  isLoading,
}) => {
  const hash = poolDetail?.encode || "";
  const view = poolDetail?.view || "";
  const description = poolDetail?.description || "-";

  const latestCert = poolDetail?.cert?.[0];
  const latestStat = poolDetail?.stat?.reduce((latest, current) =>
    current.epoch_no > latest.epoch_no ? current : latest
  );

  const aboutList = [
    {
      label: "Description",
      value: isLoading ? (
        <div className='h-5 w-32 animate-pulse rounded bg-border' />
      ) : (
        description
      ),
    },
    {
      label: "Pool ID",
      value: isLoading ? (
        <div className='h-5 w-40 animate-pulse rounded bg-border' />
      ) : (
        <span className='flex items-center gap-1'>
          {formatString(hash || "", "long")}
          {hash && <Copy copyText={hash} />}
        </span>
      ),
    },
    {
      label: "Pool View",
      value: isLoading ? (
        <div className='h-5 w-40 animate-pulse rounded bg-border' />
      ) : (
        <span className='flex items-center gap-1'>
          {formatString(view || "", "long")}
          {view && <Copy copyText={view} />}
        </span>
      ),
    },
    {
      label: "Delegators",
      value: isLoading ? (
        <div className='h-5 w-16 animate-pulse rounded bg-border' />
      ) : (
        formatNumber(latestStat?.number_of_delegators ?? 0)
      ),
    },
  ];

  const stakeAndPledgeList = [
    {
      label: "Stake",
      value: isLoading ? (
        <div className='h-5 w-24 animate-pulse rounded bg-border' />
      ) : (
        <AdaWithTooltip data={latestStat?.stake ?? 0} />
      ),
    },
    {
      label: "Pledge",
      value: isLoading ? (
        <div className='h-5 w-24 animate-pulse rounded bg-border' />
      ) : (
        <AdaWithTooltip data={latestCert?.pledge ?? 0} />
      ),
    },
    {
      label: "Margin Fee",
      value: isLoading ? (
        <div className='h-5 w-16 animate-pulse rounded bg-border' />
      ) : (
        (latestCert?.margin ? (latestCert.margin * 100).toFixed(2) : "0") + "%"
      ),
    },
    {
      label: "Fixed Fee",
      value: isLoading ? (
        <div className='h-5 w-24 animate-pulse rounded bg-border' />
      ) : (
        <AdaWithTooltip data={latestCert?.fixed_cost ?? 0} />
      ),
    },
  ];

  const performanceList = [
    {
      label: "Blocks in Epoch",
      value: isLoading ? (
        <div className='h-5 w-16 animate-pulse rounded bg-border' />
      ) : (
        formatNumber(latestStat?.number_of_blocks ?? 0)
      ),
    },
    {
      label: "Blocks Lifetime",
      value: isLoading ? (
        <div className='h-5 w-20 animate-pulse rounded bg-border' />
      ) : (
        formatNumber(
          poolDetail?.stat?.reduce((sum, s) => sum + s.number_of_blocks, 0) ?? 0
        )
      ),
    },
  ];

  return (
    <section className='flex w-full justify-center py-3'>
      <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile md:px-desktop xl:flex-nowrap xl:justify-start'>
        <div className='flex grow basis-[980px] flex-wrap items-stretch gap-3'>
          <OverviewCard title='About' overviewList={aboutList} />
          <OverviewCard
            title='Stake and Pledge'
            overviewList={stakeAndPledgeList}
          />
          <OverviewCard title='Performance' overviewList={performanceList} />
        </div>
      </div>
    </section>
  );
};
