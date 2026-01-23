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
