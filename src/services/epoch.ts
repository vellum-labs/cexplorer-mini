import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface EpochData {
  no: number;
  start_time: string;
  end_time: string;
  out_sum: number;
  fees: number;
  tx_count: number;
  blk_count: number;
}

export interface EpochListData {
  epoch: EpochData[];
}

interface EpochParamData {
  epoch_param: {
    max_block_size: number;
  }[];
}

type Vars = {
  limit: number;
  orderBy: { epoch_no: "desc" }[];
};

const EPOCH_LIST_QUERY = `
  query GetEpochs($limit: Int!, $offset: Int!, $orderBy: [epoch_order_by!]!) {
    epoch(limit: $limit, offset: $offset, order_by: $orderBy) {
      no
      start_time
      end_time
      out_sum
      fees
      tx_count
      blk_count
    }
  }
`;

type EpochListVars = {
  limit: number;
  offset: number;
  orderBy: { no: "desc" }[];
};

export const useFetchEpochList = (limit: number) => {
  return useInfiniteQuery<EpochListData, Error>({
    queryKey: ["epochs", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<EpochListData, EpochListVars>(EPOCH_LIST_QUERY, {
        limit,
        offset: pageParam as number,
        orderBy: [{ no: "desc" }],
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.epoch?.length ?? 0;

      if (received < limit) return undefined;

      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

export const useFetchEpochParam = () => {
  const EPOCH_PARAM_QUERY = `
    query GetEpochParams($limit: Int!, $orderBy: [epoch_param_order_by!]!) {
        epoch_param(limit: $limit, order_by: $orderBy) {
            max_block_size
        }
    }
    `;

  return useQuery({
    queryKey: ["epoch_params"],
    queryFn: () =>
      gql<EpochParamData, Vars>(EPOCH_PARAM_QUERY, {
        limit: 1,
        orderBy: [{ epoch_no: "desc" }],
      }),
  });
};
