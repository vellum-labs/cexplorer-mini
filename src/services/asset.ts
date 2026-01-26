import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface AssetMint {
  quantity: number;
  encode: string; // tx hash
}

export interface AssetDetailData {
  fingerprint: string;
  id: number;
  mint: AssetMint[];
  name: string;
  policy: string;
  quantity: number;
}

export interface AssetListResponse {
  mini_asset_detail: AssetDetailData[];
}

type AssetListVars = {
  limit: number;
  offset: number;
};

const ASSET_LIST_QUERY = `
  query GetAssetList($limit: Int!, $offset: Int!) {
    mini_asset_detail(limit: $limit, offset: $offset) {
      fingerprint
      id
      mint
      name
      policy
      quantity
    }
  }
`;

export const useFetchAssetList = (limit: number) => {
  return useInfiniteQuery<AssetListResponse, Error>({
    queryKey: ["assets", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<AssetListResponse, AssetListVars>(ASSET_LIST_QUERY, {
        limit,
        offset: pageParam as number,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.mini_asset_detail?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

type AssetDetailVars = {
  fingerprint: string;
};

const ASSET_DETAIL_QUERY = `
  query GetAssetDetail($fingerprint: String!) {
    mini_asset_detail(where: {fingerprint: {_eq: $fingerprint}}) {
      fingerprint
      id
      mint
      name
      policy
      quantity
    }
  }
`;

export const useFetchAssetDetail = (fingerprint: string) => {
  return useQuery<AssetListResponse, Error>({
    queryKey: ["assetDetail", fingerprint],
    queryFn: () =>
      gql<AssetListResponse, AssetDetailVars>(ASSET_DETAIL_QUERY, {
        fingerprint,
      }),
    enabled: !!fingerprint,
    refetchOnWindowFocus: true,
  });
};

export interface AssetMintDetail {
  quantity: string;
  tx_id: number;
}

export interface AssetMintListResponse {
  ma_tx_mint: AssetMintDetail[];
}

type AssetMintVars = {
  assetId: number;
  limit: number;
  offset: number;
};

const ASSET_MINT_QUERY = `
  query GetAssetMints($assetId: bigint!, $limit: Int!, $offset: Int!) {
    ma_tx_mint(
      where: {ident: {_eq: $assetId}}
      limit: $limit
      offset: $offset
      order_by: {tx_id: desc}
    ) {
      quantity
      tx_id
    }
  }
`;

export const useFetchAssetMints = (assetId: number | undefined, limit: number) => {
  return useInfiniteQuery<AssetMintListResponse, Error>({
    queryKey: ["assetMints", assetId, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<AssetMintListResponse, AssetMintVars>(ASSET_MINT_QUERY, {
        assetId: assetId!,
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.ma_tx_mint?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!assetId,
    refetchOnWindowFocus: true,
  });
};

export interface TxByIdData {
  id: number;
  hash: string;
  block_id: number;
}

export interface TxByIdResponse {
  tx: TxByIdData[];
}

type TxByIdVars = {
  txIds: number[];
};

const TX_BY_IDS_QUERY = `
  query GetTxByIds($txIds: [bigint!]!) {
    tx(where: {id: {_in: $txIds}}) {
      id
      hash
      block_id
    }
  }
`;

export const cleanHash = (hash: string): string => {
  if (hash.startsWith("\\x")) {
    return hash.slice(2);
  }
  return hash;
};

export const useFetchTxByIds = (txIds: number[]) => {
  return useQuery<TxByIdResponse, Error>({
    queryKey: ["txByIds", txIds],
    queryFn: () =>
      gql<TxByIdResponse, TxByIdVars>(TX_BY_IDS_QUERY, {
        txIds,
      }),
    enabled: txIds.length > 0,
    refetchOnWindowFocus: true,
  });
};

export interface BlockByIdData {
  id: number;
  time: string;
}

export interface BlockByIdResponse {
  block: BlockByIdData[];
}

type BlockByIdVars = {
  blockIds: number[];
};

const BLOCK_BY_IDS_QUERY = `
  query GetBlockByIds($blockIds: [bigint!]!) {
    block(where: {id: {_in: $blockIds}}) {
      id
      time
    }
  }
`;

export const useFetchBlockByIds = (blockIds: number[]) => {
  return useQuery<BlockByIdResponse, Error>({
    queryKey: ["blockByIds", blockIds],
    queryFn: () =>
      gql<BlockByIdResponse, BlockByIdVars>(BLOCK_BY_IDS_QUERY, {
        blockIds,
      }),
    enabled: blockIds.length > 0,
    refetchOnWindowFocus: true,
  });
};

export interface TxByHashData {
  id: number;
  hash: string;
}

export interface TxByHashResponse {
  tx: TxByHashData[];
}

type TxByHashVars = {
  hashes: string[];
};

const TX_BY_HASHES_QUERY = `
  query GetTxByHashes($hashes: [bytea!]!) {
    tx(where: {hash: {_in: $hashes}}) {
      id
      hash
    }
  }
`;

export const useFetchTxByHashes = (hashes: string[]) => {
  const byteaHashes = hashes.map(h => `\\x${h}`);
  return useQuery<TxByHashResponse, Error>({
    queryKey: ["txByHashes", hashes],
    queryFn: () =>
      gql<TxByHashResponse, TxByHashVars>(TX_BY_HASHES_QUERY, {
        hashes: byteaHashes,
      }),
    enabled: hashes.length > 0,
    refetchOnWindowFocus: true,
  });
};

export interface TxMetadataData {
  tx_id: number;
  key: number;
  json: unknown;
}

export interface TxMetadataResponse {
  tx_metadata: TxMetadataData[];
}

type TxMetadataVars = {
  txIds: number[];
};

const TX_METADATA_QUERY = `
  query GetTxMetadata($txIds: [bigint!]!) {
    tx_metadata(where: {tx_id: {_in: $txIds}}) {
      tx_id
      key
      json
    }
  }
`;

export const useFetchTxMetadata = (txIds: number[]) => {
  return useQuery<TxMetadataResponse, Error>({
    queryKey: ["txMetadata", txIds],
    queryFn: () =>
      gql<TxMetadataResponse, TxMetadataVars>(TX_METADATA_QUERY, {
        txIds,
      }),
    enabled: txIds.length > 0,
    refetchOnWindowFocus: true,
  });
};

export interface MaTxOutData {
  tx_out_id: number;
  quantity: string;
}

export interface MaTxOutResponse {
  ma_tx_out: MaTxOutData[];
}

type MaTxOutVars = {
  assetId: number;
  limit: number;
  offset: number;
};

const MA_TX_OUT_QUERY = `
  query GetMaTxOut($assetId: bigint!, $limit: Int!, $offset: Int!) {
    ma_tx_out(
      where: {ident: {_eq: $assetId}}
      limit: $limit
      offset: $offset
    ) {
      tx_out_id
      quantity
    }
  }
`;

export const useFetchMaTxOut = (assetId: number | undefined, limit: number) => {
  return useInfiniteQuery<MaTxOutResponse, Error>({
    queryKey: ["maTxOut", assetId, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<MaTxOutResponse, MaTxOutVars>(MA_TX_OUT_QUERY, {
        assetId: assetId!,
        limit,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.ma_tx_out?.length ?? 0;
      if (received < limit) return undefined;
      return allPages.length * limit;
    },
    enabled: !!assetId,
    refetchOnWindowFocus: true,
  });
};

export interface TxOutData {
  id: number;
  address: string;
  consumed_by_tx_id: number | null;
}

export interface TxOutResponse {
  tx_out: TxOutData[];
}

type TxOutVars = {
  txOutIds: number[];
};

const TX_OUT_QUERY = `
  query GetTxOut($txOutIds: [bigint!]!) {
    tx_out(where: {id: {_in: $txOutIds}, consumed_by_tx_id: {_is_null: true}}) {
      id
      address
      consumed_by_tx_id
    }
  }
`;

export const useFetchTxOut = (txOutIds: number[]) => {
  return useQuery<TxOutResponse, Error>({
    queryKey: ["txOut", txOutIds],
    queryFn: () =>
      gql<TxOutResponse, TxOutVars>(TX_OUT_QUERY, {
        txOutIds,
      }),
    enabled: txOutIds.length > 0,
    refetchOnWindowFocus: true,
  });
};
