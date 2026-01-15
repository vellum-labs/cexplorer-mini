import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import { AdaWithTooltip, DateCell, PoolCell } from "@vellumlabs/cexplorer-sdk";

export const RewardsTab: FC = () => {
  const items = Array.from({ length: 20 }, () => ({
    earned_epoch: 601,
    spendable_epoch: {
      start_time: "2026-01-04T21:44:52",
    },
    pool: {
      id: "pool1lfsslc99da8jhj5apzctsnfm76kjc6ndyc6hnynagcj8xexvjsr",
      meta: {
        name: "Binance Node - 14",
        ticker: "BNP",
        extended: null,
        homepage: "https://www.binance.com/en/earn",
        description: "Binance Staking Pool",
      },
    },
    account: {
      epoch_stake: 10000,
    },
    amount: 10000,
  }));

  const columns = [
    {
      key: "epoch",
      render: item => <p>{item?.earned_epoch ?? 0}</p>,
      title: <p>Epoch</p>,
      widthPx: 50,
    },
    {
      key: "date",
      render: item => (
        <DateCell time={item?.spendable_epoch?.start_time ?? ""} />
      ),
      title: "Date",
      widthPx: 50,
    },
    {
      key: "stake_pool",
      render: item => <PoolCell poolInfo={item.pool} />,
      title: "Stake Pool",
      widthPx: 50,
    },
    {
      key: "active_stake",
      render: item => (
        <span className='flex justify-end'>
          <AdaWithTooltip data={item?.account?.epoch_stake ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Active Stake</p>,
      widthPx: 50,
    },
    {
      key: "reward",
      render: item => (
        <span className='flex justify-end'>
          <AdaWithTooltip data={item?.amount ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Reward</p>,
      widthPx: 50,
    },
    {
      key: "roa",
      render: item => (
        <p className='text-right'>
          {(
            ((item.amount * 365.25) / 5 / item.account.epoch_stake) *
            100
          ).toFixed(2)}
          %
        </p>
      ),
      title: <p className='w-full text-right'>Roa</p>,
      widthPx: 50,
    },
  ];

  return (
    <TableList
      title='All Rewards'
      withPadding={false}
      columns={columns}
      items={items}
      storeKey='rewards_list'
    />
  );
};
