import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { normalizeHash } from "@/utils/normalizeHash";

export interface AddressAsset {
  quantity: number;
  asset_name: string;
  fingerprint?: string;
  policy?: string;
}

export interface AddressData {
  address: string;
  balance: number | null;
  asset: AddressAsset[] | null;
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

type AddressDetailVars = {
  address: string;
};

const ADDRESS_DETAIL_QUERY = `
  query GetAddressDetail($address: String!) {
    mini_get_address(where: {address: {_eq: $address}}) {
      address
      balance
      asset
    }
  }
`;

export const useFetchAddressDetail = (address: string) => {
  return useQuery<AddressListData, Error>({
    queryKey: ["addressDetail", address],
    queryFn: () =>
      gql<AddressListData, AddressDetailVars>(ADDRESS_DETAIL_QUERY, {
        address,
      }),
    enabled: !!address,
    refetchOnWindowFocus: true,
  });
};

export interface StakeAddressData {
  stake_hash: string;
  stake_view: string;
  status: string | null;
  total_balance: string | null;
  utxo: string | null;
  rewards: string | null;
  rewards_available: string | null;
  withdrawals: string | null;
  delegated_pool: string | null;
  delegated_drep: string | null;
  asset: AddressAsset[] | null;
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

type StakeDetailVars = {
  stakeView: string;
};

const STAKE_DETAIL_QUERY = `
  query GetStakeDetail($stakeView: String!) {
    mini_account_detail(where: {stake_view: {_eq: $stakeView}}) {
      stake_hash
      stake_view
      status
      total_balance
      utxo
      rewards
      rewards_available
      withdrawals
      delegated_pool
      delegated_drep
      asset
    }
  }
`;

export const useFetchStakeDetail = (stakeView: string) => {
  return useQuery<StakeAddressListData, Error>({
    queryKey: ["stakeDetail", stakeView],
    queryFn: () =>
      gql<StakeAddressListData, StakeDetailVars>(STAKE_DETAIL_QUERY, {
        stakeView,
      }),
    enabled: !!stakeView,
    refetchOnWindowFocus: true,
  });
};

export interface UtxoAsset {
  name: string;
  quantity: number;
  fingerprint?: string;
}

export interface UtxoItem {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
  value: string;
  datum_hash: string | null;
  asset_list: UtxoAsset[] | null;
}

export interface UtxoListData {
  sum: string;
  has_script: boolean;
  utxo_set: UtxoItem[];
}

export interface AddressUtxoData {
  address: string;
  utxo_list: UtxoListData[];
}

export interface AddressUtxoResponse {
  mini_utxo: AddressUtxoData[];
}

type AddressUtxoVars = {
  address: string;
};

const ADDRESS_UTXO_QUERY = `
  query GetAddressUtxo($address: String!) {
    mini_utxo(where: {address: {_eq: $address}}, limit: 1) {
      address
      utxo_list
    }
  }
`;

export const useFetchAddressUtxo = (address: string) => {
  return useQuery<AddressUtxoResponse, Error>({
    queryKey: ["addressUtxo", address],
    queryFn: () =>
      gql<AddressUtxoResponse, AddressUtxoVars>(ADDRESS_UTXO_QUERY, {
        address,
      }),
    enabled: !!address,
    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

export interface StakeAddressIdResponse {
  stake_address: { id: number; view: string }[];
}

export interface WithdrawalItem {
  id: number;
  amount: string;
  tx_id: number;
}

export interface WithdrawalResponse {
  withdrawal: WithdrawalItem[];
}

export interface TxForWithdrawal {
  id: number;
  hash: string;
  fee: string;
  block_id: number;
}

export interface TxForWithdrawalResponse {
  tx: TxForWithdrawal[];
}

export interface BlockForWithdrawal {
  id: number;
  time: string;
  epoch_no: number;
  block_no: number;
  hash: string;
}

export interface BlockForWithdrawalResponse {
  block: BlockForWithdrawal[];
}

export interface WithdrawalWithDetails {
  id: number;
  amount: string;
  tx: {
    hash: string;
    fee: string;
  };
  block: {
    time: string;
    epoch_no: number;
    no: number;
    hash: string;
  };
}

const STAKE_ADDRESS_ID_QUERY = `
  query GetStakeAddressId($view: String!) {
    stake_address(where: {view: {_eq: $view}}, limit: 1) {
      id
      view
    }
  }
`;

const fetchStakeAddressId = async (stakeView: string): Promise<number | null> => {
  const result = await gql<StakeAddressIdResponse, { view: string }>(
    STAKE_ADDRESS_ID_QUERY,
    { view: stakeView }
  );
  return result.stake_address?.[0]?.id ?? null;
};

const WITHDRAWAL_QUERY = `
  query GetWithdrawals($addrId: bigint!, $limit: Int!, $offset: Int!) {
    withdrawal(
      where: {addr_id: {_eq: $addrId}}
      limit: $limit
      offset: $offset
      order_by: {id: desc}
    ) {
      id
      amount
      tx_id
    }
  }
`;

const TX_BY_IDS_FOR_WITHDRAWAL_QUERY = `
  query GetTxByIds($txIds: [bigint!]!) {
    tx(where: {id: {_in: $txIds}}) {
      id
      hash
      fee
      block_id
    }
  }
`;

const BLOCK_BY_IDS_QUERY = `
  query GetBlockByIds($blockIds: [bigint!]!) {
    block(where: {id: {_in: $blockIds}}) {
      id
      time
      epoch_no
      block_no
      hash
    }
  }
`;

export interface StakeRewardItem {
  amount: string;
  earned_epoch: number;
  spendable_epoch: number;
  pool_id: number;
  type: string;
}

export interface StakeRewardResponse {
  reward: StakeRewardItem[];
}

const STAKE_REWARDS_QUERY = `
  query GetStakeRewards($addrId: bigint!, $limit: Int!, $offset: Int!) {
    reward(
      where: {addr_id: {_eq: $addrId}}
      limit: $limit
      offset: $offset
      order_by: {earned_epoch: desc}
    ) {
      amount
      earned_epoch
      spendable_epoch
      pool_id
      type
    }
  }
`;

export interface AddressStakeResponse {
  mini_address_tx_list: { stake_address: string | null }[];
}

const ADDRESS_STAKE_QUERY = `
  query GetAddressStake($address: String!) {
    mini_address_tx_list(where: {address: {_eq: $address}}, limit: 1) {
      stake_address
    }
  }
`;

export const useFetchAddressStake = (address: string) => {
  return useQuery<string | null, Error>({
    queryKey: ["addressStake", address],
    queryFn: async () => {
      const result = await gql<AddressStakeResponse, { address: string }>(
        ADDRESS_STAKE_QUERY,
        { address }
      );
      return result.mini_address_tx_list?.[0]?.stake_address ?? null;
    },
    enabled: !!address,
    refetchOnWindowFocus: false,
  });
};

export const useFetchStakeRewards = (stakeAddress: string, limit: number = 20) => {
  return useInfiniteQuery<StakeRewardItem[], Error>({
    queryKey: ["stakeRewards", stakeAddress, limit],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const addrId = await fetchStakeAddressId(stakeAddress);
      if (!addrId) return [];

      const rewardsResult = await gql<StakeRewardResponse, { addrId: number; limit: number; offset: number }>(
        STAKE_REWARDS_QUERY,
        { addrId, limit, offset: pageParam as number }
      );

      return rewardsResult.reward ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!stakeAddress,
    refetchOnWindowFocus: true,
  });
};

export const useFetchWithdrawals = (stakeAddress: string, limit: number = 20) => {
  return useInfiniteQuery<WithdrawalWithDetails[], Error>({
    queryKey: ["withdrawals", stakeAddress, limit],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const addrId = await fetchStakeAddressId(stakeAddress);
      if (!addrId) return [];

      const withdrawalsResult = await gql<WithdrawalResponse, { addrId: number; limit: number; offset: number }>(
        WITHDRAWAL_QUERY,
        { addrId, limit, offset: pageParam as number }
      );

      const withdrawals = withdrawalsResult.withdrawal;
      if (!withdrawals?.length) return [];

      const txIds = withdrawals.map(w => w.tx_id);
      const txResult = await gql<TxForWithdrawalResponse, { txIds: number[] }>(
        TX_BY_IDS_FOR_WITHDRAWAL_QUERY,
        { txIds }
      );

      const txMap = new Map(txResult.tx.map(t => [t.id, t]));

      const blockIds = txResult.tx.map(t => t.block_id);
      const blockResult = await gql<BlockForWithdrawalResponse, { blockIds: number[] }>(
        BLOCK_BY_IDS_QUERY,
        { blockIds }
      );

      const blockMap = new Map(blockResult.block.map(b => [b.id, b]));

      return withdrawals.map(w => {
        const tx = txMap.get(w.tx_id);
        const block = tx ? blockMap.get(tx.block_id) : null;

        return {
          id: w.id,
          amount: w.amount,
          tx: {
            hash: normalizeHash(tx?.hash ?? ''),
            fee: tx?.fee ?? '0',
          },
          block: {
            time: block?.time ?? '',
            epoch_no: block?.epoch_no ?? 0,
            no: block?.block_no ?? 0,
            hash: normalizeHash(block?.hash ?? ''),
          },
        };
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!stakeAddress,
    refetchOnWindowFocus: true,
  });
};
