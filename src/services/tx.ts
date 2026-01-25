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

export interface TxDetailData {
  tx_hash: string;
  tx_timestamp: number;
  block_height: number;
  block_hash: string;
  epoch_no: number;
  fee: string;
  tx_size: number;
  total_output: string;
  inputs: TxUtxo[];
  outputs: TxUtxo[];
  plutus_contracts: PlutusContract[] | null;
  collateral_inputs: TxUtxo[] | null;
  collateral_output: TxUtxo | null;
  withdrawals: Withdrawal[] | null;
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
      fee
      tx_size
      total_output
      inputs
      outputs
      plutus_contracts
      collateral_inputs
      collateral_output
      withdrawals
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
