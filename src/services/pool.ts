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
  poolHash: string;
};

const POOL_DETAIL_QUERY = `
  query GetPoolDetail($poolHash: String!) {
    mini_pool_detail(where: {encode: {_eq: $poolHash}}) {
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

export const useFetchPoolDetail = (poolHash: string) => {
  return useQuery<PoolListResponse, Error>({
    queryKey: ["poolDetail", poolHash],
    queryFn: () =>
      gql<PoolListResponse, PoolDetailVars>(POOL_DETAIL_QUERY, {
        poolHash,
      }),
    enabled: !!poolHash,
    refetchOnWindowFocus: true,
  });
};

// Pool Delegators
export interface PoolDelegator {
  stake_hash: string;
  stake_view: string | null;
  total_balance: string | null;
  delegated_pool: string | null;
}

export interface PoolDelegatorsResponse {
  mini_account_detail: PoolDelegator[];
}

type PoolDelegatorsVars = {
  poolHash: string;
  limit: number;
  offset: number;
};

const POOL_DELEGATORS_QUERY = `
  query GetPoolDelegators($poolHash: String!, $limit: Int!, $offset: Int!) {
    mini_account_detail(
      where: {delegated_pool: {_eq: $poolHash}},
      limit: $limit,
      offset: $offset
    ) {
      stake_hash
      stake_view
      total_balance
      delegated_pool
    }
  }
`;

export const useFetchPoolDelegators = (poolHash: string, limit: number) => {
  return useInfiniteQuery<PoolDelegatorsResponse, Error>({
    queryKey: ["poolDelegators", poolHash, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<PoolDelegatorsResponse, PoolDelegatorsVars>(POOL_DELEGATORS_QUERY, {
        poolHash,
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_account_detail?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!poolHash,
    refetchOnWindowFocus: true,
  });
};

interface PoolDelegatorsCountResponse {
  mini_account_detail_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

const POOL_DELEGATORS_COUNT_QUERY = `
  query GetPoolDelegatorsCount($poolHash: String!) {
    mini_account_detail_aggregate(where: {delegated_pool: {_eq: $poolHash}}) {
      aggregate {
        count
      }
    }
  }
`;

export const useFetchPoolDelegatorsCount = (poolHash: string) => {
  return useQuery<PoolDelegatorsCountResponse, Error>({
    queryKey: ["poolDelegatorsCount", poolHash],
    queryFn: () =>
      gql<PoolDelegatorsCountResponse, { poolHash: string }>(
        POOL_DELEGATORS_COUNT_QUERY,
        { poolHash }
      ),
    enabled: !!poolHash,
    refetchOnWindowFocus: true,
  });
};

// Pool Relays
export interface PoolRelay {
  id: number;
  ipv4: string | null;
  ipv6: string | null;
  dns_name: string | null;
  dns_srv_name: string | null;
  port: number | null;
}

export interface PoolRelaysResponse {
  pool_relay: PoolRelay[];
}

const POOL_RELAYS_QUERY = `
  query GetPoolRelays($hashId: bigint!) {
    pool_relay(where: {update: {hash_id: {_eq: $hashId}}}) {
      id
      ipv4
      ipv6
      dns_name
      dns_srv_name
      port
    }
  }
`;

export const useFetchPoolRelays = (hashId: number | undefined) => {
  return useQuery<PoolRelaysResponse, Error>({
    queryKey: ["poolRelays", hashId],
    queryFn: () =>
      gql<PoolRelaysResponse, { hashId: number }>(POOL_RELAYS_QUERY, {
        hashId: hashId!,
      }),
    enabled: !!hashId,
    refetchOnWindowFocus: true,
  });
};

// Pool Updates (certificates)
export interface PoolUpdate {
  id: number;
  active_epoch_no: number;
  pledge: string;
  margin: number;
  fixed_cost: string;
  registered_tx_id: number;
  reward_addr: {
    view: string;
  } | null;
  meta: {
    url: string;
    hash: string;
  } | null;
}

export interface PoolUpdatesResponse {
  pool_update: PoolUpdate[];
}

const POOL_UPDATES_QUERY = `
  query GetPoolUpdates($hashId: bigint!) {
    pool_update(where: {hash_id: {_eq: $hashId}}, order_by: {id: desc}) {
      id
      active_epoch_no
      pledge
      margin
      fixed_cost
      registered_tx_id
      reward_addr {
        view
      }
      meta {
        url
        hash
      }
    }
  }
`;

export const useFetchPoolUpdates = (hashId: number | undefined) => {
  return useQuery<PoolUpdatesResponse, Error>({
    queryKey: ["poolUpdates", hashId],
    queryFn: () =>
      gql<PoolUpdatesResponse, { hashId: number }>(POOL_UPDATES_QUERY, {
        hashId: hashId!,
      }),
    enabled: !!hashId,
    refetchOnWindowFocus: true,
  });
};

// Pool Retire
export interface PoolRetire {
  id: number;
  retiring_epoch: number;
  announced_tx_id: number;
}

export interface PoolRetiresResponse {
  pool_retire: PoolRetire[];
}

const POOL_RETIRES_QUERY = `
  query GetPoolRetires($hashId: bigint!) {
    pool_retire(where: {hash_id: {_eq: $hashId}}, order_by: {id: desc}) {
      id
      retiring_epoch
      announced_tx_id
    }
  }
`;

export const useFetchPoolRetires = (hashId: number | undefined) => {
  return useQuery<PoolRetiresResponse, Error>({
    queryKey: ["poolRetires", hashId],
    queryFn: () =>
      gql<PoolRetiresResponse, { hashId: number }>(POOL_RETIRES_QUERY, {
        hashId: hashId!,
      }),
    enabled: !!hashId,
    refetchOnWindowFocus: true,
  });
};
