import { gql } from "@/lib/gql";
import { useInfiniteQuery } from "@tanstack/react-query";

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

type Vars = {
  limit: number;
  offset: number;
  orderBy: { time: "desc" }[];
};

const BLOCK_LIST_QUERY = `
  query GetBlocks($limit: Int!, $offset: Int!, $orderBy: [block_order_by!]!) {
    block(limit: $limit, offset: $offset, order_by: $orderBy) {
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

export const useFetchBlockList = (limit: number) => {
  return useInfiniteQuery<BlockListData, Error>({
    queryKey: ["blocks", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<BlockListData, Vars>(BLOCK_LIST_QUERY, {
        limit,
        offset: pageParam as number,
        orderBy: [{ time: "desc" }],
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
