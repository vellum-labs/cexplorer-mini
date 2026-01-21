import { gql } from "@/lib/gql";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface TxData {
  hash: string;
  block_id: number;
  size: number;
  fee: number;
  out_sum: number;
}

export interface TxListData {
  tx: TxData[];
}

type Vars = {
  limit: number;
  offset: number;
};

const TX_LIST_QUERY = `
  query GetTxList($limit: Int!, $offset: Int!) {
    tx(limit: $limit, offset: $offset) {
      hash
      block_id
      size
      fee
      out_sum
    }
  }
`;

export const useFetchTxList = (limit: number) => {
  return useInfiniteQuery<TxListData, Error>({
    queryKey: ["tx", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<TxListData, Vars>(TX_LIST_QUERY, {
        limit,
        offset: pageParam as number,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.tx?.length ?? 0;

      if (received < limit) return undefined;

      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};
