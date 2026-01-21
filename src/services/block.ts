import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { normalizeHash } from "@/utils/normalizeHash";

export interface BlockData {
  block_no: number | null;
  epoch_no: number | null;
  hash: string;
  slot_no: number | null;
  size: number;
  tx_count: number;
}

export interface BlockListData {
  block: BlockData[];
}

export interface SlotLeaderData {
  hash: string;
  description: string;
}

export interface TxData {
  hash: string;
  size: number;
  out_sum: number;
  fee: number;
}

export interface BlockDetailData {
  block_no: number | null;
  block_time: string | null;
  epoch_no: number | null;
  slot_no: number | null;
  tx_count: number;
  slot_leader: SlotLeaderData | null;
  block_size: number;
  tx_data: TxData[];
  vrf_key: string | null;
  proto_major: number | null;
  proto_minor: number | null;
  op_cert_counter: number | null;
}

export interface BlockDetailResponse {
  mini_block_detail: BlockDetailData[];
}

type Vars = {
  limit: number;
  offset: number;
  orderBy: { time: "desc" }[];
  where?: {
    epoch_no?: {
      _eq: number;
    };
  };
};

const BLOCK_LIST_QUERY = `
  query GetBlocks($limit: Int!, $offset: Int!, $orderBy: [block_order_by!]!, $where: block_bool_exp) {
    block(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      block_no
      time
      hash
      epoch_no
      slot_no
      size
      tx_count
    }
  }
`;

export const useFetchBlockList = (limit: number, epochNo?: number) => {
  const where = epochNo !== undefined ? { epoch_no: { _eq: epochNo } } : undefined;

  return useInfiniteQuery<BlockListData, Error>({
    queryKey: ["blocks", limit, epochNo],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<BlockListData, Vars>(BLOCK_LIST_QUERY, {
        limit,
        offset: pageParam as number,
        orderBy: [{ time: "desc" }],
        where,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.block?.length ?? 0;

      if (received < limit) return undefined;

      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

const BLOCK_DETAIL_QUERY = `
  query GetBlockDetail($blockHash: String!) {
    mini_block_detail(where: {block_hash: {_eq: $blockHash}}) {
      block_no
      block_time
      epoch_no
      slot_no
      tx_count
      slot_leader
      block_size
      tx_data
      vrf_key
      proto_major
      proto_minor
      op_cert_counter
    }
  }
`;

type BlockDetailVars = {
  blockHash: string;
};

export const useFetchBlockDetail = (blockHash: string) => {
  const normalizedHash = normalizeHash(blockHash);

  return useQuery<BlockDetailResponse, Error>({
    queryKey: ["blockDetail", normalizedHash],
    queryFn: () =>
      gql<BlockDetailResponse, BlockDetailVars>(BLOCK_DETAIL_QUERY, {
        blockHash: normalizedHash,
      }),
    enabled: !!normalizedHash,
    refetchOnWindowFocus: true,
  });
};
