import type { Column } from "@/components/global/TableList";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { HashCell } from "@/components/tx/HashCell";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { BlockCell } from "@vellumlabs/cexplorer-sdk/BlockCell";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { SizeCell } from "@vellumlabs/cexplorer-sdk/SizeCell";

import { useFetchTxList, type TxListData } from "@/services/tx";
import { normalizeHash } from "@/utils/normalizeHash";

interface UseTxListReturn {
  items: any[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<TxListData, unknown>, Error>
  >;
  hasNextPage: boolean;
}

export const useTxList = (
  blockTxData?: any[],
  hideColumns: string[] = [],
): UseTxListReturn => {
  const { data: txData, fetchNextPage, hasNextPage } = useFetchTxList(20);

  const items =
    blockTxData ??
    txData?.pages.flatMap(page =>
      page.mini_tx_detail.map(tx => ({
        hash: normalizeHash(tx.tx_hash),
        time: tx.tx_timestamp ? new Date(tx.tx_timestamp * 1000) : null,
        fee: tx.fee,
        size: tx.tx_size,
        out_sum: tx.total_output,
        block: {
          epoch_no: tx.epoch_no,
          hash: normalizeHash(tx.block_hash),
          no: tx.block_height,
        },
      })),
    );

  const columns = [
    {
      key: "date",
      render: item => <DateCell time={item.time} />,
      title: "Date",

      widthPx: 50,
    },
    {
      key: "hash",
      render: item => <HashCell hash={item.hash} />,
      title: "Hash",

      widthPx: 60,
    },
    {
      key: "block",
      render: item => (
        <div className='flex items-center justify-end gap-[2px] text-primary'>
          <EpochCell no={item?.block?.epoch_no} />
          /
          <BlockCell hash={item?.block?.hash} no={item?.block?.no ?? 0} />
        </div>
      ),
      title: <p className='w-full text-right'>Epoch / Block</p>,

      widthPx: 40,
    },
    {
      key: "total_output",
      render: item => (
        <span className='flex items-center justify-end'>
          <AdaWithTooltip data={item?.out_sum ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Total Output</p>,

      widthPx: 50,
    },
    {
      key: "size",
      render: item => <SizeCell size={item.size} maxSize={16384} />,
      title: <p className='w-full text-right'>Size</p>,

      widthPx: 50,
    },
    {
      key: "fee",
      render: item => (
        <span className='flex items-center justify-end'>
          <AdaWithTooltip data={item?.fee ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Fee</p>,

      widthPx: 40,
    },
  ];

  return {
    items,
    columns: columns
      .filter(col => !hideColumns.includes(col.key))
      .map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
