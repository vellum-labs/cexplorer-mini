import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface PoolCert {
  pledge: number;
  margin: number;
  fixed_cost: number;
  vrf_key_hash: string;
  reward_addr_view: string;
  owners: string[];
}

export interface PoolStat {
  epoch_no: number;
  number_of_blocks: number;
  number_of_delegators: number;
  stake: number;
}

export interface PoolDetailData {
  cert: PoolCert[];
  description: string;
  encode: string;
  pool_hash_id: number;
  slot_leader_id: number;
  stat: PoolStat[];
  view: string;
}

export interface PoolListResponse {
  mini_pool_detail: PoolDetailData[];
}

type PoolListVars = {
  limit: number;
  offset: number;
};

const POOL_LIST_QUERY = `
  query GetPoolList($limit: Int!, $offset: Int!) {
    mini_pool_detail(limit: $limit, offset: $offset) {
      cert
      description
      encode
      pool_hash_id
      slot_leader_id
      stat
      view
    }
  }
`;

export const useFetchPoolList = (limit: number) => {
  return useInfiniteQuery<PoolListResponse, Error>({
    queryKey: ["pools", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<PoolListResponse, PoolListVars>(POOL_LIST_QUERY, {
        limit,
        offset: pageParam as number,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_pool_detail?.length ?? 0;

      if (received < limit) return undefined;

      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

type PoolDetailVars = {
  poolView: string;
};

const POOL_DETAIL_QUERY = `
  query GetPoolDetail($poolView: String!) {
    mini_pool_detail(where: {view: {_eq: $poolView}}) {
      cert
      description
      encode
      pool_hash_id
      slot_leader_id
      stat
      view
    }
  }
`;

export const useFetchPoolDetail = (poolView: string) => {
  return useQuery<PoolListResponse, Error>({
    queryKey: ["poolDetail", poolView],
    queryFn: () =>
      gql<PoolListResponse, PoolDetailVars>(POOL_DETAIL_QUERY, {
        poolView,
      }),
    enabled: !!poolView,
    refetchOnWindowFocus: true,
  });
};
