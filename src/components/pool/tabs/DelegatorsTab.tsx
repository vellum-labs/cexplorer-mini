import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import {
  AdaWithTooltip,
  Copy,
  DateCell,
  formatString,
  PoolCell,
} from "@vellumlabs/cexplorer-sdk";
import { Link } from "@tanstack/react-router";

interface DelegatorsTabProps {
  type?: "pool" | "DRep";
}

export const DelegatorsTab: FC<DelegatorsTabProps> = ({ type = "pool" }) => {
  const columns = [
    {
      key: "date",
      render: () => {
        return <DateCell time='2026-01-04T21:44:52' />;
      },
      title: <p>Date</p>,
      widthPx: 20,
    },
    {
      key: "address",
      render: () => {
        const view =
          "stake1u9zjr6e37w53a474puhx606ayr3rz2l6jljrmzvlzkk3cmg0m2zw0";

        const isStake = view.includes("stake");

        return (
          <div className='flex items-center gap-1/2'>
            <Link
              className='text-primary'
              to={isStake ? "/stake/$stakeAddr" : "/address/$address"}
              params={isStake ? { stakeAddr: view } : { address: view || "" }}
            >
              {formatString(view, "long")}
            </Link>
            <Copy copyText={view} />
          </div>
        );
      },
      title: "Address",
      widthPx: 90,
    },
    {
      key: `${type}_delegation`,
      render: () => {
        return (
          <div className='flex min-w-[40%] items-center gap-1'>
            <PoolCell
              poolInfo={{
                id: "pool1lfsslc99da8jhj5apzctsnfm76kjc6ndyc6hnynagcj8xexvjsr",
                meta: {
                  name: "Binance Node - 14",
                  ticker: "BNP",
                  extended: null,
                  homepage: "https://www.binance.com/en/earn",
                  description: "Binance Staking Pool",
                },
              }}
              fontSize='12px'
            />
          </div>
        );
      },
      title: <p>Previous {type}</p>,
      widthPx: 180,
    },
    {
      key: "amount",
      render: () => (
        <div className='flex flex-col items-end gap-1/2'>
          <AdaWithTooltip data={45656465456} />
        </div>
      ),
      title: (
        <div className='flex w-full justify-end'>
          <span>Amount</span>
        </div>
      ),
      widthPx: 40,
    },
  ];

  return (
    <TableList
      columns={columns}
      storeKey='delegators_tab'
      items={Array.from({ length: 20 }, () => ({ rodo: true }))}
    />
  );
};
