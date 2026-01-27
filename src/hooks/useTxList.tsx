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

import {
  useFetchTxList,
  useFetchAddressTxList,
  useFetchAssetTxList,
  type TxListData,
  type AddressTxListResponse,
  type AssetTxListResponse,
  type MiniTxData,
  type AddressTxItem,
  type AssetTxItem,
} from "@/services/tx";
import { normalizeHash } from "@/utils/normalizeHash";

interface UseTxListReturn {
  items: any[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<TxListData | AddressTxListResponse | AssetTxListResponse, unknown>,
      Error
    >
  >;
  hasNextPage: boolean;
  loading: boolean;
}

interface UseTxListOptions {
  address?: string;
  fingerprint?: string;
  hideColumns?: string[];
}

const mapTxData = (tx: MiniTxData) => ({
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
});

const mapAddressTxData = (tx: AddressTxItem) => ({
  hash: normalizeHash(tx.tx_hash),
  time: tx.block_time ? new Date(tx.block_time) : null,
  fee: null,
  size: tx.tx_size,
  out_sum: tx.out_sum,
  block: {
    epoch_no: tx.epoch,
    hash: normalizeHash(tx.block_hash),
    no: tx.block_no,
  },
});

const mapAssetTxData = (tx: AssetTxItem) => ({
  hash: normalizeHash(tx.tx_hash),
  time: tx.block_time ? new Date(tx.block_time) : null,
  fee: null,
  size: tx.tx_size,
  out_sum: tx.out_sum,
  block: {
    epoch_no: tx.epoch,
    hash: normalizeHash(tx.block_hash),
    no: tx.block_no,
  },
});

export const useTxList = (
  blockTxData?: any[],
  hideColumns: string[] = [],
  options?: UseTxListOptions,
): UseTxListReturn => {
  const { address, fingerprint } = options ?? {};

  const generalQuery = useFetchTxList(20);
  const addressQuery = useFetchAddressTxList(address ?? "", 20);
  const assetQuery = useFetchAssetTxList(fingerprint ?? "", 20);

  const isAddressQuery = !!address;
  const isAssetQuery = !!fingerprint;

  const activeQuery = isAddressQuery
    ? addressQuery
    : isAssetQuery
      ? assetQuery
      : generalQuery;

  const { isLoading, fetchNextPage, hasNextPage } = activeQuery;

  let items: any[] | undefined;

  if (blockTxData) {
    items = blockTxData;
  } else if (isAddressQuery) {
    items = addressQuery.data?.pages.flatMap(
      page => page.mini_address_tx_list?.map(mapAddressTxData) ?? [],
    );
  } else if (isAssetQuery) {
    items = assetQuery.data?.pages.flatMap(
      page => page.mini_asset_tx_list?.map(mapAssetTxData) ?? [],
    );
  } else {
    items = generalQuery.data?.pages.flatMap(page =>
      page.mini_tx_detail.map(mapTxData),
    );
  }

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

  const allHideColumns = [...hideColumns, ...(options?.hideColumns ?? [])];

  return {
    loading: isLoading,
    items,
    columns: columns
      .filter(col => !allHideColumns.includes(col.key))
      .map(item => ({ ...item, visible: true })),
    fetchNextPage: fetchNextPage as any,
    hasNextPage,
  };
};
