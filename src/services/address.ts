import { gql } from "@/lib/gql";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface AddressData {
  address: string;
  balance: number | null;
}

export interface AddressListData {
  mini_get_address: AddressData[];
}

type AddressListVars = {
  limit: number;
  offset: number;
};

const ADDRESS_LIST_QUERY = `
  query GetAddresses($limit: Int!, $offset: Int!) {
    mini_get_address(limit: $limit, offset: $offset) {
      address
      balance
    }
  }
`;

export const useFetchAddressList = (limit: number) => {
  return useInfiniteQuery<AddressListData, Error>({
    queryKey: ["addresses", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<AddressListData, AddressListVars>(ADDRESS_LIST_QUERY, {
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_get_address?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

export interface StakeAddressData {
  delegated_drep: string | null;
  delegated_pool: string | null;
  total_balance: string | null;
  stake_hash: string;
}

export interface StakeAddressListData {
  mini_account_detail: StakeAddressData[];
}

const STAKE_ADDRESS_LIST_QUERY = `
  query GetStakeAddresses($limit: Int!, $offset: Int!) {
    mini_account_detail(limit: $limit, offset: $offset) {
      delegated_drep
      delegated_pool
      total_balance
      stake_hash
    }
  }
`;

export const useFetchStakeAddressList = (limit: number) => {
  return useInfiniteQuery<StakeAddressListData, Error>({
    queryKey: ["stakeAddresses", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<StakeAddressListData, AddressListVars>(STAKE_ADDRESS_LIST_QUERY, {
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_account_detail?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};
