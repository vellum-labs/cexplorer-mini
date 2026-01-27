import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface TxAsset {
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
}

export interface TxUtxo {
  value: string;
  tx_hash: string;
  tx_index: number;
  asset_list: TxAsset[] | null;
  datum_hash: string | null;
  stake_addr: string | null;
  payment_addr: {
    cred: string;
    bech32: string;
  };
}

export interface Withdrawal {
  amount: string;
  stake_addr: string;
}

export interface PlutusContract {
  size: number;
  address: string;
  bytecode: string;
  script_hash: string;
  valid_contract: boolean;
}

export type TxMetadata = Record<string, unknown> | null;

export interface TxDetailData {
  tx_hash: string;
  tx_timestamp: number;
  block_height: number;
  block_hash: string;
  epoch_no: number;
  epoch_slot: number;
  absolute_slot: number;
  fee: string;
  tx_size: number;
  total_output: string;
  deposit: string | null;
  invalid_after: number | null;
  inputs: TxUtxo[];
  outputs: TxUtxo[];
  plutus_contracts: PlutusContract[] | null;
  collateral_inputs: TxUtxo[] | null;
  collateral_output: TxUtxo | null;
  withdrawals: Withdrawal[] | null;
  reference_inputs: TxUtxo[] | null;
  metadata: TxMetadata;
}

export interface TxDetailResponse {
  mini_tx_detail: TxDetailData[];
}

export interface MiniTxData {
  tx_hash: string;
  tx_timestamp: number;
  block_height: number;
  block_hash: string;
  epoch_no: number;
  epoch_slot: number;
  fee: string;
  tx_size: number;
  total_output: string;
}

export interface TxListData {
  mini_tx_detail: MiniTxData[];
}

type Vars = {
  limit: number;
  offset: number;
  orderBy: { tx_timestamp: string }[];
};

const TX_LIST_QUERY = `
  query GetTxList($limit: Int!, $offset: Int!, $orderBy: [mini_tx_detail_order_by!]!) {
    mini_tx_detail(limit: $limit, offset: $offset, order_by: $orderBy) {
      tx_hash
      tx_timestamp
      block_height
      block_hash
      epoch_no
      epoch_slot
      fee
      tx_size
      total_output
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
        orderBy: [{ tx_timestamp: "desc" }],
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_tx_detail?.length ?? 0;

      if (received < limit) return undefined;

      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

const TX_DETAIL_QUERY = `
  query GetTxDetail($txHash: String!) {
    mini_tx_detail(where: {tx_hash: {_eq: $txHash}}) {
      tx_hash
      tx_timestamp
      block_height
      block_hash
      epoch_no
      epoch_slot
      absolute_slot
      fee
      tx_size
      total_output
      deposit
      invalid_after
      inputs
      outputs
      plutus_contracts
      collateral_inputs
      collateral_output
      withdrawals
      reference_inputs
      metadata
    }
  }
`;

type TxDetailVars = {
  txHash: string;
};

export const useFetchTxDetail = (txHash: string) => {
  return useQuery<TxDetailResponse, Error>({
    queryKey: ["txDetail", txHash],
    queryFn: () =>
      gql<TxDetailResponse, TxDetailVars>(TX_DETAIL_QUERY, {
        txHash,
      }),
    enabled: !!txHash,
    refetchOnWindowFocus: true,
  });
};

export interface AddressTxItem {
  address: string;
  block_hash: string;
  block_no: number;
  block_time: string;
  epoch: number;
  out_sum: string;
  stake_address: string | null;
  tx_hash: string;
  tx_id: number;
  tx_size: number;
  value: string;
}

export interface AddressTxListResponse {
  mini_address_tx_list: AddressTxItem[];
}

type AddressTxListVars = {
  address: string;
  limit: number;
  offset: number;
};

const ADDRESS_TX_LIST_QUERY = `
  query GetAddressTxList($address: String!, $limit: Int!, $offset: Int!) {
    mini_address_tx_list(
      where: {_or: [{address: {_eq: $address}}, {stake_address: {_eq: $address}}]}
      limit: $limit
      offset: $offset
      order_by: {block_time: desc}
    ) {
      address
      block_hash
      block_no
      block_time
      epoch
      out_sum
      stake_address
      tx_hash
      tx_id
      tx_size
      value
    }
  }
`;

export const useFetchAddressTxList = (address: string, limit: number) => {
  return useInfiniteQuery<AddressTxListResponse, Error>({
    queryKey: ["addressTxList", address, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<AddressTxListResponse, AddressTxListVars>(ADDRESS_TX_LIST_QUERY, {
        address,
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_address_tx_list?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!address,
    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

export interface AssetTxItem {
  asset_id: number;
  asset_name: string;
  asset_policy: string;
  block_hash: string;
  block_no: number;
  block_time: string;
  epoch: number;
  fingerprint: string;
  out_sum: string;
  quantity: string;
  tx_hash: string;
  tx_id: number;
  tx_size: number;
}

export interface AssetTxListResponse {
  mini_asset_tx_list: AssetTxItem[];
}

type AssetTxListVars = {
  fingerprint: string;
  limit: number;
  offset: number;
};

const ASSET_TX_LIST_QUERY = `
  query GetAssetTxList($fingerprint: String!, $limit: Int!, $offset: Int!) {
    mini_asset_tx_list(
      where: {fingerprint: {_eq: $fingerprint}}
      limit: $limit
      offset: $offset
      order_by: {block_time: desc}
    ) {
      asset_id
      asset_name
      asset_policy
      block_hash
      block_no
      block_time
      epoch
      fingerprint
      out_sum
      quantity
      tx_hash
      tx_id
      tx_size
    }
  }
`;

export const useFetchAssetTxList = (fingerprint: string, limit: number) => {
  return useInfiniteQuery<AssetTxListResponse, Error>({
    queryKey: ["assetTxList", fingerprint, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<AssetTxListResponse, AssetTxListVars>(ASSET_TX_LIST_QUERY, {
        fingerprint,
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_asset_tx_list?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!fingerprint,
    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};
