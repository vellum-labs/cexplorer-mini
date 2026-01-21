import type { FC } from "react";
import type { EpochDetailData } from "@/services/epoch";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { PulseDot } from "@vellumlabs/cexplorer-sdk/PulseDot";
import { TimeDateIndicator } from "@vellumlabs/cexplorer-sdk/TimeDateIndicator";

interface EpochSummaryProps {
  epochDetail?: EpochDetailData;
  isCurrentEpoch?: boolean;
}

export const EpochSummary: FC<EpochSummaryProps> = ({ epochDetail, isCurrentEpoch = false }) => {
  const overviewList = [
    {
      label: "Beginning",
      value: epochDetail?.start_time ? (
        <TimeDateIndicator time={epochDetail.start_time} />
      ) : (
        <span>-</span>
      ),
    },
    {
      label: "End",
      value: epochDetail?.end_time ? (
        <TimeDateIndicator time={epochDetail.end_time} />
      ) : (
        <span>-</span>
      ),
    },
    {
      label: "Blocks",
      value: (
        <p className='text-text-sm font-medium'>
          {epochDetail?.blk_count ? formatNumber(epochDetail.blk_count) : "-"}
        </p>
      ),
    },
    {
      label: "Transactions",
      value: (
        <p className='text-text-sm font-medium'>
          {epochDetail?.tx_count ? formatNumber(epochDetail.tx_count) : "-"}
        </p>
      ),
    },
    {
      label: "Fees Generated",
      value: (
        <p className='text-text-sm font-medium'>
          {epochDetail?.fees ? <AdaWithTooltip data={epochDetail.fees} /> : "-"}
        </p>
      ),
    },
    {
      label: "TPS:",
      value: (
        <p className='text-text-sm font-medium'>
          {/* TPS calculation can be added later */}
          - (used) / - (cap)
        </p>
      ),
    },
  ];

  return (
    <OverviewCard
      title='Summary'
      subTitle={
        isCurrentEpoch ? (
          <div className='relative flex h-[24px] w-[115px] items-center justify-end rounded-m border border-border px-[10px]'>
            <div className='absolute left-2'>
              <PulseDot />
            </div>
            <span className='text-text-xs font-medium'>Current Epoch</span>
          </div>
        ) : undefined
      }
      overviewList={overviewList}
    />
  );
};
