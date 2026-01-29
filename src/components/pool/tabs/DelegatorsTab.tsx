import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

import { useFetchPoolDelegators } from "@/services/pool";
import { useMemo } from "react";

interface DelegatorsTabProps {
  poolHash?: string;
}

export const DelegatorsTab: FC<DelegatorsTabProps> = ({ poolHash }) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useFetchPoolDelegators(poolHash ?? "", 20);

  const items = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.mini_account_detail ?? []);
  }, [data]);

  const columns = [
    {
      key: "address",
      render: item => {
        const view = item.stake_view || item.stake_hash || "";
        return (
          <div className='flex items-center gap-1'>
            <Link
              className='text-primary'
              to='/stake/$stakeAddr'
              params={{ stakeAddr: view }}
            >
              {formatString(view, "long")}
            </Link>
            <Copy copyText={view} />
          </div>
        );
      },
      title: "Stake Address",
      widthPx: 150,
    },
    {
      key: "amount",
      render: item => (
        <div className='flex flex-col items-end'>
          <AdaWithTooltip data={Number(item.total_balance ?? 0)} />
        </div>
      ),
      title: <p className='w-full text-right'>Balance</p>,
      widthPx: 60,
    },
  ];

  return (
    <TableList
      columns={columns}
      storeKey='pool_delegators_tab'
      items={items}
      loading={isLoading}
      fetching={isFetching}
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
      withPadding={false}
    />
  );
};
