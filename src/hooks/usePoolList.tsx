import type { Column } from "@/components/global/TableList";
import type { PoolListResponse } from "@/services/pool";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

import { useFetchPoolList } from "@/services/pool";

interface UsePoolListReturn {
  items: any[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<PoolListResponse, unknown>, Error>
  >;
  hasNextPage: boolean;
  loading: boolean;
}

export const usePoolList = (): UsePoolListReturn => {
  const {
    data: poolData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchPoolList(20);

  const items = poolData?.pages.flatMap(page => page.mini_pool_detail);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLatestStat = (item: any) => {
    if (!item.stat || item.stat.length === 0) return null;
    return item.stat.reduce(
      (latest: { epoch_no: number }, current: { epoch_no: number }) =>
        current.epoch_no > latest.epoch_no ? current : latest
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLatestCert = (item: any) => {
    if (!item.cert || item.cert.length === 0) return null;
    return item.cert[0];
  };

  const columns = [
    {
      key: "pool",
      render: item => {
        const hash = item.encode || "";
        if (!hash) {
          return (
            <span className='text-grayTextPrimary'>
              {item.description || "-"}
            </span>
          );
        }
        return (
          <div className='flex items-center gap-1'>
            <Link to='/pool/$id' params={{ id: hash }} className='text-primary'>
              {formatString(hash, "long")}
            </Link>
            <Copy copyText={hash} />
          </div>
        );
      },
      title: "Pool",
      widthPx: 150,
    },
    {
      key: "stake",
      render: item => {
        const latestStat = getLatestStat(item);
        return (
          <div className='flex flex-col gap-1.5'>
            <span className='text-right text-grayTextPrimary'>
              <AdaWithTooltip data={latestStat?.stake ?? 0} />
            </span>
          </div>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Stake</span>
        </div>
      ),
      widthPx: 60,
    },
    {
      key: "fees",
      render: item => {
        const latestCert = getLatestCert(item);
        return (
          <div className='flex flex-col text-right text-text-xs text-grayTextPrimary'>
            <span>
              {latestCert?.margin ? (latestCert.margin * 100).toFixed(2) : 0}%
            </span>
            <AdaWithTooltip
              triggerClassName='text-text-xs'
              data={latestCert?.fixed_cost ?? 0}
            />
          </div>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <p className='text-right'>Fees</p>
        </div>
      ),
      widthPx: 50,
    },
    {
      key: "blocks",
      render: item => {
        const latestStat = getLatestStat(item);
        const totalBlocks = item.stat?.reduce(
          (sum: number, s: { number_of_blocks: number }) =>
            sum + s.number_of_blocks,
          0
        );

        return (
          <div className='text-right text-grayTextPrimary'>
            <div className='flex items-center justify-end gap-1'>
              <span>{formatNumber(latestStat?.number_of_blocks ?? 0)}</span>
            </div>
            <div className='text-text-xs text-grayTextSecondary'>
              ({formatNumber(totalBlocks ?? 0)} total)
            </div>
          </div>
        );
      },
      title: <span className='w-full text-right'>Blocks</span>,
      widthPx: 100,
    },
    {
      key: "pledge",
      render: item => {
        const latestCert = getLatestCert(item);
        return (
          <span className='w-[60px] whitespace-nowrap text-grayTextPrimary'>
            <AdaWithTooltip data={latestCert?.pledge ?? 0} />
          </span>
        );
      },
      title: <span>Pledge</span>,
      widthPx: 55,
    },
    {
      key: "delegators",
      render: item => {
        const latestStat = getLatestStat(item);
        return (
          <p className='text-right'>
            {formatNumber(latestStat?.number_of_delegators ?? 0)}
          </p>
        );
      },
      title: <p className='w-full text-right'>Delegators</p>,
      widthPx: 85,
    },
  ];

  return {
    items,
    loading: isLoading,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
