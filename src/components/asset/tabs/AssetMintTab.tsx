import type { FC } from "react";
import type { Column } from "@/components/global/TableList";

import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { TableList } from "@/components/global/TableList";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { HashCell } from "@/components/tx/HashCell";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";

import {
  useFetchAssetMints,
  useFetchTxByIds,
  useFetchBlockByIds,
} from "@/services/asset";
import { useMemo } from "react";

import { normalizeHash } from "@/utils/normalizeHash";

interface AssetMintTabProps {
  assetId?: number;
}

interface EnrichedMint {
  quantity: string;
  tx_id: number;
  tx_hash?: string;
  tx_time?: string;
}

export const AssetMintTab: FC<AssetMintTabProps> = ({ assetId }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchAssetMints(
    assetId,
    20,
  );

  const mints = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.ma_tx_mint ?? []);
  }, [data]);

  const txIds = useMemo(() => mints.map(m => m.tx_id), [mints]);

  const { data: txData, isLoading: txLoading } = useFetchTxByIds(txIds);

  const blockIds = useMemo(() => {
    if (!txData?.tx) return [];
    return [...new Set(txData.tx.map(t => t.block_id))];
  }, [txData]);

  const { data: blockData, isLoading: blockLoading } =
    useFetchBlockByIds(blockIds);

  const txMap = useMemo(() => {
    const map = new Map<number, { hash: string; blockId: number }>();
    txData?.tx?.forEach(tx => {
      map.set(tx.id, { hash: normalizeHash(tx.hash), blockId: tx.block_id });
    });
    return map;
  }, [txData]);

  const blockMap = useMemo(() => {
    const map = new Map<number, string>();
    blockData?.block?.forEach(b => {
      map.set(b.id, b.time);
    });
    return map;
  }, [blockData]);

  const enrichedMints: EnrichedMint[] = useMemo(() => {
    return mints.map(m => {
      const txInfo = txMap.get(m.tx_id);
      const time = txInfo ? blockMap.get(txInfo.blockId) : undefined;
      return {
        ...m,
        tx_hash: txInfo?.hash,
        tx_time: time,
      };
    });
  }, [mints, txMap, blockMap]);

  const columns = [
    {
      key: "time",
      render: (item: EnrichedMint) =>
        item.tx_time ? <DateCell time={item.tx_time} /> : <span>-</span>,
      title: "Time",
      visible: true,
      widthPx: 80,
    },
    {
      key: "type",
      render: (item: EnrichedMint) => {
        const qty = Number(item?.quantity);
        if (qty > 1) {
          return <Badge color='blue'>Mint</Badge>;
        }
        if (qty < 0) {
          return <Badge color='red'>Burn</Badge>;
        }
        return <Badge color='yellow'>NFT</Badge>;
      },
      title: "Type",
      visible: true,
      widthPx: 50,
    },
    {
      key: "tx_hash",
      render: (item: EnrichedMint) =>
        item.tx_hash ? (
          <HashCell hash={item.tx_hash} />
        ) : (
          <span>{item.tx_id}</span>
        ),
      title: "Transaction",
      visible: true,
      widthPx: 150,
    },
    {
      key: "mint_quantity",
      render: (item: EnrichedMint) => (
        <p className='text-right'>{formatNumber(Number(item.quantity))}</p>
      ),
      title: <p className='w-full text-right'>Quantity</p>,
      visible: true,
      widthPx: 80,
    },
  ];

  return (
    <TableList
      columns={
        columns as unknown as Omit<Column<Record<string, unknown>>, "visible">[]
      }
      items={enrichedMints}
      storeKey='asset_mint_tab'
      loading={isLoading || txLoading || blockLoading}
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
    />
  );
};
