import type { Column } from "@/components/global/TableList";

import {
  AdaWithTooltip,
  formatString,
  PoolCell,
} from "@vellumlabs/cexplorer-sdk";
import { DrepNameCell } from "@/components/drep/DrepNameCell";
import { Link } from "@tanstack/react-router";

interface UseAddressListReturn {
  items: Record<string, unknown>[];
  columns: Column<Record<string, unknown>>[];
}

export const useAddressList = (
  isStake: boolean = false,
): UseAddressListReturn => {
  const items = Array.from({ length: 20 }, () => ({
    account: !isStake
      ? "addr1q8elqhkuvtyelgcedpup58r893awhg3l87a4rz5d5acatuj9y84nruafrmta2rewd5l46g8zxy4l49ly8kye79ddr3ksqal35g"
      : "stakeq8elqhkuvtyelgcedpup58r893awhg3l87a4rz5d5acatuj9y84nruafrmta2rewd5l46g8zxy4l49ly8kye79ddr3ksqal35g",
    live_stake: 10000000000,
    drep_delegation: {
      url: "https://raw.githubusercontent.com/Emurgo/constitution-committee/11af02e3b66daa7106941a1b3000d9721862bc3c/YOROI.jsonld",
      image_url:
        "https://raw.githubusercontent.com/Emurgo/constitution-committee/main/yoroi.png",
      given_name: "Yoroi W₳llet",
      objectives:
        "The Cardano blockchain has transitioned into a fully decentralized and distributed network that is governed by its community of users, developers, and other stakeholders.",
      payment_address: null,
    },
    pool_delegation: {
      pool_id: "pool1lfsslc99da8jhj5apzctsnfm76kjc6ndyc6hnynagcj8xexvjsr",
      pool_name: {
        name: "Binance Node - 14",
        ticker: "BNP",
        extended: null,
        homepage: "https://www.binance.com/en/earn",
        description: "Binance Staking Pool",
      },
    },
  }));

  const columns = [
    {
      key: "account",
      render: item => {
        if (!item?.account) {
          return "-";
        }

        return (
          <Link
            to={isStake ? "/stake/$stakeAddr" : "/address/$address"}
            params={{
              address: "todo",
              stakeAddr: "todo",
            }}
            className='text-primary'
          >
            <span title={item.account as string}>
              {formatString(item.account, "long")}
            </span>
          </Link>
        );
      },
      title: <p>Account</p>,

      widthPx: 120,
    },
    {
      key: "live_stake",
      render: item => {
        if (typeof item?.live_stake === "undefined") {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            <AdaWithTooltip data={item.live_stake} />
          </p>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Live Stake</span>
        </div>
      ),

      widthPx: 80,
    },
    {
      key: "drep_delegation",
      render: item => {
        if (!item?.drep_delegation) {
          return "-";
        }

        return (
          <DrepNameCell
            item={{
              data: item.drep_delegation,
              hash: {
                view: "drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j",
              },
            }}
          />
        );
      },
      title: <p>DRep Delegation</p>,

      widthPx: 120,
    },
    {
      key: "pool_delegation",
      render: item => {
        if (!item?.pool_delegation) {
          return "-";
        }

        return (
          <PoolCell
            poolInfo={{
              id: item.pool_delegation.pool_id,
              meta: item.pool_delegation.pool_name,
            }}
          />
        );
      },
      title: <p>Pool Delegation</p>,

      widthPx: 120,
    },
  ];

  return {
    items,
    columns,
  };
};
