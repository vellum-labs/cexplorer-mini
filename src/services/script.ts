import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const toByteaHash = (hash: string): string => {
  return hash ? `\\x${hash}` : "";
};

export interface ScriptData {
  id: number;
  script_hash: string;
  type: string;
  size: number | null;
  creation_tx_hash: string | null;
  bytes: string | null;
  value: unknown | null;
}

export interface ScriptListResponse {
  mini_script_detail: ScriptData[];
}

type ScriptListVars = {
  limit: number;
  offset: number;
};

const SCRIPT_LIST_QUERY = `
  query GetScriptList($limit: Int!, $offset: Int!) {
    mini_script_detail(limit: $limit, offset: $offset, order_by: {id: desc}) {
      id
      script_hash
      type
      size
      creation_tx_hash
    }
  }
`;

export const useFetchScriptList = (limit: number) => {
  return useInfiniteQuery<ScriptListResponse, Error>({
    queryKey: ["scripts", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<ScriptListResponse, ScriptListVars>(SCRIPT_LIST_QUERY, {
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_script_detail?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 20000,
  });
};

type ScriptDetailVars = {
  scriptHash: string;
};

const SCRIPT_DETAIL_QUERY = `
  query GetScriptDetail($scriptHash: String!) {
    mini_script_detail(where: {script_hash: {_eq: $scriptHash}}) {
      id
      script_hash
      type
      size
      creation_tx_hash
      bytes
      value
    }
  }
`;

export const useFetchScriptDetail = (scriptHash: string) => {
  return useQuery<ScriptListResponse, Error>({
    queryKey: ["scriptDetail", scriptHash],
    queryFn: () =>
      gql<ScriptListResponse, ScriptDetailVars>(SCRIPT_DETAIL_QUERY, {
        scriptHash,
      }),
    enabled: !!scriptHash,
    refetchOnWindowFocus: false,
  });
};

export interface RedeemerAggregateResponse {
  redeemer_aggregate: {
    aggregate: {
      count: number;
      sum: {
        fee: number | null;
      };
    };
  };
}

type RedeemerAggregateVars = {
  scriptHash: string;
};

const REDEEMER_AGGREGATE_QUERY = `
  query GetRedeemerAggregate($scriptHash: bytea!) {
    redeemer_aggregate(where: {script_hash: {_eq: $scriptHash}}) {
      aggregate {
        count
        sum {
          fee
        }
      }
    }
  }
`;

export const useFetchScriptStats = (scriptHash: string) => {
  return useQuery<RedeemerAggregateResponse, Error>({
    queryKey: ["scriptStats", scriptHash],
    queryFn: () =>
      gql<RedeemerAggregateResponse, RedeemerAggregateVars>(
        REDEEMER_AGGREGATE_QUERY,
        {
          scriptHash: toByteaHash(scriptHash),
        },
      ),
    enabled: !!scriptHash,
    refetchOnWindowFocus: false,
  });
};

export interface RedeemerListItem {
  id: number;
  tx_hash: string;
  block_hash: string;
  block_height: number;
  block_time: string;
  fee: number;
  purpose: string;
  unit_mem: string;
  unit_steps: string;
  index: number;
}

export interface RedeemerListResponse {
  mini_redeemer_list: RedeemerListItem[];
}

type RedeemerListVars = {
  scriptHash: string;
  limit: number;
  offset: number;
};

const REDEEMER_LIST_QUERY = `
  query GetRedeemerList($scriptHash: bytea!, $limit: Int!, $offset: Int!) {
    mini_redeemer_list(
      where: {script_hash: {_eq: $scriptHash}}
      limit: $limit
      offset: $offset
      order_by: {block_time: desc}
    ) {
      id
      tx_hash
      block_hash
      block_height
      block_time
      fee
      purpose
      unit_mem
      unit_steps
      index
    }
  }
`;

export const useFetchRedeemerList = (scriptHash: string, limit: number) => {
  return useInfiniteQuery<RedeemerListResponse, Error>({
    queryKey: ["redeemerList", scriptHash, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<RedeemerListResponse, RedeemerListVars>(REDEEMER_LIST_QUERY, {
        scriptHash: toByteaHash(scriptHash),
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_redeemer_list?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!scriptHash,
    refetchOnWindowFocus: false,
  });
};
