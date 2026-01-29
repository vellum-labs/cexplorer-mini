import type { FC } from "react";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";

import { TableList } from "@/components/global/TableList";
import { useFetchStakeRewards } from "@/services/address";

interface StakeRewardsTabProps {
  stakeAddress?: string;
}

export const StakeRewardsTab: FC<StakeRewardsTabProps> = ({ stakeAddress }) => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useFetchStakeRewards(
    stakeAddress ?? "",
    20
  );

  const items = data?.pages.flatMap(page => page) ?? [];
  const currentEpoch = items[0]?.earned_epoch ?? 0;

  const columns = [
    {
      key: "epoch",
      render: item => (
        <EpochCell
          no={item?.earned_epoch}
          showPulseDot
          currentEpoch={currentEpoch}
          justify='start'
        />
      ),
      title: <p className='w-full'>Epoch</p>,
      widthPx: 40,
    },
    {
      key: "amount",
      render: item => {
        return (
          <div className='flex w-full flex-col items-end gap-1/2'>
            <p className='text-grayTextPrimary'>
              <AdaWithTooltip data={item?.amount ?? 0} />
            </p>
          </div>
        );
      },
      title: <p className='w-full text-right'>Amount</p>,
      widthPx: 50,
    },
    {
      key: "type",
      render: item => {
        const type = item?.type ?? "unknown";
        const color = type === "leader" ? "yellow" : type === "member" ? "blue" : "gray";
        return (
          <div className='flex justify-end'>
            <Badge color={color}>{type}</Badge>
          </div>
        );
      },
      title: <p className='w-full text-right'>Type</p>,
      widthPx: 40,
    },
    {
      key: "spendable",
      render: item => (
        <EpochCell
          no={item?.spendable_epoch}
          showPulseDot={false}
          currentEpoch={currentEpoch}
          justify='end'
        />
      ),
      title: <p className='w-full text-right'>Spendable Epoch</p>,
      widthPx: 50,
    },
  ];

  return (
    <TableList
      title='All Rewards'
      columns={columns}
      storeKey='stake_rewards_tab'
      items={items}
      loading={isLoading}
      fetching={isFetching}
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
      withPadding={false}
    />
  );
};
