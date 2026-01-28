import type { FC } from "react";
import type { PoolStat } from "@/services/pool";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { TableList } from "@/components/global/TableList";

import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";

interface RewardsTabProps {
  stats?: PoolStat[];
  isLoading?: boolean;
}

export const RewardsTab: FC<RewardsTabProps> = ({ stats, isLoading }) => {
  const sortedStats = stats
    ? [...stats].sort((a, b) => b.epoch_no - a.epoch_no)
    : [];

  const columns = [
    {
      key: "epoch",
      render: item => (
        <EpochCell
          no={item.epoch_no}
          showPulseDot
          currentEpoch={sortedStats[0]?.epoch_no ?? 0}
          justify='start'
        />
      ),
      title: <p className='w-full'>Epoch</p>,
      widthPx: 40,
    },
    {
      key: "stake",
      render: item => {
        return (
          <div className='flex w-full flex-col items-end gap-1/2'>
            <p className='text-grayTextPrimary'>
              <AdaWithTooltip data={item.stake ?? 0} />
            </p>
          </div>
        );
      },
      title: <p className='w-full text-right'>Stake</p>,
      widthPx: 50,
    },
    {
      key: "blocks",
      title: <p className='w-full text-right'>Blocks</p>,
      render: item => (
        <div className='text-right'>{formatNumber(item.number_of_blocks)}</div>
      ),
      widthPx: 55,
    },
    {
      key: "delegators",
      title: <p className='w-full text-right'>Delegators</p>,
      render: item => (
        <div className='text-right'>
          {formatNumber(item.number_of_delegators)}
        </div>
      ),
      widthPx: 35,
    },
  ];

  return (
    <TableList
      columns={columns}
      storeKey='pool_detail_rewards_tab'
      items={sortedStats}
      loading={isLoading}
      showMoreButton={false}
      withPadding={false}
    />
  );
};
