import { gql } from "@/lib/gql";
import { useInfiniteQuery } from "@tanstack/react-query";
import { normalizeHash } from "@/utils/normalizeHash";

export interface TxMetadataItem {
  id: number;
  key: number;
  json: unknown;
  tx_id: number;
  bytes: string;
}

export interface TxMetadataResponse {
  tx_metadata: TxMetadataItem[];
}

interface TxData {
  id: number;
  hash: string;
  block_id: number;
}

interface TxResponse {
  tx: TxData[];
}

interface BlockData {
  id: number;
  time: string;
}

interface BlockResponse {
  block: BlockData[];
}

export interface MetadataWithDetails {
  id: number;
  key: number;
  json: unknown;
  bytes: string;
  size: number;
  tx_hash: string;
  block_time: string;
}

type MetadataListVars = {
  limit: number;
  offset: number;
};

const METADATA_LIST_QUERY = `
  query GetMetadataList($limit: Int!, $offset: Int!) {
    tx_metadata(
      limit: $limit
      offset: $offset
      order_by: {id: desc}
    ) {
      id
      key
      json
      tx_id
      bytes
    }
  }
`;

const TX_BY_IDS_QUERY = `
  query GetTxByIds($txIds: [bigint!]!) {
    tx(where: {id: {_in: $txIds}}) {
      id
      hash
      block_id
    }
  }
`;

const BLOCK_BY_IDS_QUERY = `
  query GetBlockByIds($blockIds: [bigint!]!) {
    block(where: {id: {_in: $blockIds}}) {
      id
      time
    }
  }
`;

export const useFetchMetadataList = (limit: number) => {
  return useInfiniteQuery<MetadataWithDetails[], Error>({
    queryKey: ["metadataList", limit],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const metadataResult = await gql<TxMetadataResponse, MetadataListVars>(
        METADATA_LIST_QUERY,
        { limit, offset: pageParam as number }
      );

      const metadata = metadataResult.tx_metadata;
      if (!metadata?.length) return [];

      const txIds = [...new Set(metadata.map(m => m.tx_id))];
      const txResult = await gql<TxResponse, { txIds: number[] }>(
        TX_BY_IDS_QUERY,
        { txIds }
      );

      const txMap = new Map(txResult.tx.map(t => [t.id, t]));

      const blockIds = [...new Set(txResult.tx.map(t => t.block_id))];
      const blockResult = await gql<BlockResponse, { blockIds: number[] }>(
        BLOCK_BY_IDS_QUERY,
        { blockIds }
      );

      const blockMap = new Map(blockResult.block.map(b => [b.id, b]));

      return metadata.map(m => {
        const tx = txMap.get(m.tx_id);
        const block = tx ? blockMap.get(tx.block_id) : null;

        return {
          id: m.id,
          key: m.key,
          json: m.json,
          bytes: m.bytes,
          size: m.bytes ? m.bytes.length : 0,
          tx_hash: normalizeHash(tx?.hash ?? ""),
          block_time: block?.time ?? "",
        };
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};
