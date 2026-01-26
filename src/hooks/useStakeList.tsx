import type { Column } from "@/components/global/TableList";
import type { StakeAddressData, StakeAddressListData } from "@/services/address";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

import { useFetchStakeAddressList } from "@/services/address";

interface UseStakeListReturn {
  items: StakeAddressData[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<StakeAddressListData, unknown>, Error>
  >;
  hasNextPage: boolean;
}

export const useStakeList = (): UseStakeListReturn => {
  const { data, fetchNextPage, hasNextPage } = useFetchStakeAddressList(20);

  const items = data?.pages.flatMap(page => page.mini_account_detail);

  const columns = [
    {
      key: "stake_hash",
      render: item => {
        if (!item?.stake_hash) {
          return "-";
        }

        return (
          <Link
            to='/stake/$stakeAddr'
            params={{ stakeAddr: item.stake_hash }}
            className='text-primary'
          >
            {formatString(item.stake_hash, "longer")}
          </Link>
        );
      },
      title: <p>Stake Address</p>,
      widthPx: 120,
    },
    {
      key: "total_balance",
      render: item => {
        if (!item?.total_balance) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            <AdaWithTooltip data={Number(item.total_balance)} />
          </p>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Balance</span>
        </div>
      ),
      widthPx: 80,
    },
    {
      key: "delegated_drep",
      render: item => {
        if (!item?.delegated_drep) {
          return "-";
        }

        return (
          <Link
            to='/drep/$hash'
            params={{ hash: item.delegated_drep }}
            className='text-primary'
          >
            {formatString(item.delegated_drep, "longer")}
          </Link>
        );
      },
      title: <p>DRep Delegation</p>,
      widthPx: 120,
    },
    {
      key: "delegated_pool",
      render: item => {
        if (!item?.delegated_pool) {
          return "-";
        }

        return (
          <Link
            to='/pool/$id'
            params={{ id: item.delegated_pool }}
            className='text-primary'
          >
            {formatString(item.delegated_pool, "longer")}
          </Link>
        );
      },
      title: <p>Pool Delegation</p>,
      widthPx: 120,
    },
  ];

  return {
    items,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
