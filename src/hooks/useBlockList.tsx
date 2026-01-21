import type { Column } from "@/components/global/TableList";
import type { BlockData, BlockListData } from "@/services/block";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { HashCell } from "@/components/tx/HashCell";
import { BlockCell } from "@vellumlabs/cexplorer-sdk/BlockCell";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
// import { PoolCell } from "@vellumlabs/cexplorer-sdk/PoolCell";
import { SizeCell } from "@vellumlabs/cexplorer-sdk/SizeCell";

import { useFetchEpochParam } from "@/services/epoch";
import { useFetchBlockList } from "@/services/block";
import { normalizeHash } from "@/utils/normalizeHash";

interface UseBlockListReturn {
  items: BlockData[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<BlockListData, unknown>, Error>
  >;
  hasNextPage: boolean;
}

export const useBlockList = (): UseBlockListReturn => {
  const { data: blockData, fetchNextPage, hasNextPage } = useFetchBlockList(20);

  const { data } = useFetchEpochParam();

  const maxBlockSize =
    data?.epoch_param && Array.isArray(data?.epoch_param)
      ? data?.epoch_param[0].max_block_size
      : undefined;

  const items = blockData?.pages.flatMap(page => page.block);

  const columns = [
    {
      key: "date",
      render: item => {
        if (!item.time) {
          return "-";
        }

        return <DateCell time={item.time} className='text-nowrap' />;
      },
      title: "Date",

      widthPx: 75,
    },
    {
      key: "block_no",
      render: item => {
        if (!item.hash || !item.block_no) {
          return "-";
        }

        return <BlockCell hash={item.hash} no={item.block_no} />;
      },
      title: <p className='w-full text-right'>Height</p>,

      widthPx: 75,
    },
    {
      key: "hash",
      render: item => {
        if (!item?.hash) {
          return "-";
        }

        return (
          <HashCell
            hash={normalizeHash(item?.hash)}
            enableHover={false}
            formatType='short'
            href='/block'
          />
        );
      },
      title: <p className='w-full text-left'>Hash</p>,

      widthPx: 75,
    },
    {
      key: "epoch_no",
      render: item => {
        if (!item.epoch_no) {
          return <p className='w-full text-right'>-</p>;
        }

        return <EpochCell no={item.epoch_no} />;
      },
      title: <p className='w-full text-right'>Epoch</p>,

      widthPx: 70,
    },
    {
      key: "slot_no",
      render: item => (
        <p className='text-right'>{formatNumber(item?.slot_no ?? 0)}</p>
      ),
      title: <p className='w-full text-right'>Slot</p>,

      widthPx: 80,
    },
    // {
    //   key: "minted_by",
    //   render: item => {
    //     if (item.epoch_no === null) {
    //       return <span>Genesis block</span>;
    //     }
    //     return <PoolCell key={String(item.slot_no)} poolInfo={item.pool} />;
    //   },
    //   title: <p>Minted by</p>,

    //   widthPx: 140,
    // },
    {
      key: "size",
      title: <p>Size</p>,
      render: item => {
        if (!maxBlockSize || !item.size) {
          return <p className='text-right'>-</p>;
        }

        return (
          <div className='text-right'>
            <SizeCell maxSize={maxBlockSize} size={item.size} />
          </div>
        );
      },

      widthPx: 90,
    },
    {
      key: "tx_count",
      render: item => {
        if (!item.tx_count) {
          return <p className='text-right'>-</p>;
        }

        return <p className='text-right'>{item.tx_count}</p>;
      },
      title: <p className='w-full text-right'>TXs</p>,

      widthPx: 50,
    },
  ];

  return {
    items,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
