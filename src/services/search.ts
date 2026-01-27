import { gql } from "@/lib/gql";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { normalizeHash } from "@/utils/normalizeHash";

export interface MiscSearch {
  url: string;
  ident: string;
  title: string;
  category: string;
  extra: {
    icon: "balance" | "time" | "hot" | "promo";
    type: "balance" | "time" | "stake";
    value: number | string;
    id?: string;
  };
}

export interface MiscSearchResponse {
  code: number;
  data: MiscSearch[] | MiscSearch;
  tokens: number;
  ex: number;
  debug: boolean;
}

const SEARCH_TX_QUERY = `
  query SearchTx($hash: String!) {
    mini_tx_detail(where: {tx_hash: {_eq: $hash}}, limit: 1) {
      tx_hash
      tx_timestamp
      total_output
    }
  }
`;

const SEARCH_BLOCK_BY_HASH_QUERY = `
  query SearchBlockByHash($hash: bytea!) {
    block(where: {hash: {_eq: $hash}}, limit: 1) {
      hash
      block_no
      time
    }
  }
`;

const SEARCH_BLOCK_BY_NO_QUERY = `
  query SearchBlockByNo($blockNo: Int!) {
    block(where: {block_no: {_eq: $blockNo}}, limit: 1) {
      hash
      block_no
      time
    }
  }
`;

const SEARCH_POOL_QUERY = `
  query SearchPool($poolHash: String!) {
    mini_pool_detail(where: {encode: {_eq: $poolHash}}, limit: 1) {
      encode
      description
      view
    }
  }
`;

const SEARCH_ASSET_QUERY = `
  query SearchAsset($fingerprint: String!) {
    mini_asset_detail(where: {fingerprint: {_eq: $fingerprint}}, limit: 1) {
      fingerprint
      name
      quantity
    }
  }
`;

const SEARCH_ADDRESS_QUERY = `
  query SearchAddress($address: String!) {
    mini_get_address(where: {address: {_eq: $address}}, limit: 1) {
      address
      balance
    }
  }
`;

const SEARCH_STAKE_QUERY = `
  query SearchStake($stakeView: String!) {
    mini_account_detail(where: {stake_view: {_eq: $stakeView}}, limit: 1) {
      stake_view
      total_balance
      delegated_pool
    }
  }
`;

const SEARCH_SCRIPT_QUERY = `
  query SearchScript($scriptHash: String!) {
    mini_script_detail(where: {script_hash: {_eq: $scriptHash}}, limit: 1) {
      script_hash
      type
      size
    }
  }
`;

interface SearchTxResponse {
  mini_tx_detail: {
    tx_hash: string;
    tx_timestamp: number | null;
    total_output: string;
  }[];
}

interface SearchBlockResponse {
  block: {
    hash: string;
    block_no: number;
    time: string | null;
  }[];
}

interface SearchPoolResponse {
  mini_pool_detail: {
    encode: string;
    description: string;
    view: string;
  }[];
}

interface SearchAssetResponse {
  mini_asset_detail: {
    fingerprint: string;
    name: string;
    quantity: number;
  }[];
}

interface SearchAddressResponse {
  mini_get_address: {
    address: string;
    balance: number | null;
  }[];
}

interface SearchStakeResponse {
  mini_account_detail: {
    stake_view: string;
    total_balance: string | null;
    delegated_pool: string | null;
  }[];
}

interface SearchScriptResponse {
  mini_script_detail: {
    script_hash: string;
    type: string;
    size: number | null;
  }[];
}

function detectQueryType(query: string) {
  const normalized = query.trim().toLowerCase();
  const isHex64 = /^[a-f0-9]{64}$/.test(normalized);
  const isHex56 = /^[a-f0-9]{56}$/.test(normalized);
  const isAddress = normalized.startsWith("addr");
  const isStake = normalized.startsWith("stake");
  const isPool = normalized.startsWith("pool");
  const isAsset = normalized.startsWith("asset");
  const isNumeric = /^\d+$/.test(normalized);

  return {
    maybeTx: isHex64,
    maybeBlock: isHex64 || isNumeric,
    maybePool: isPool,
    maybeAsset: isAsset,
    maybeAddress: isAddress,
    maybeStake: isStake,
    maybeScript: isHex56,
    isNumeric,
    normalized,
  };
}

function formatAda(lovelace: number | string | null): string {
  if (lovelace === null) return "0";
  const value = typeof lovelace === "string" ? parseFloat(lovelace) : lovelace;
  return (value / 1_000_000).toFixed(2);
}

function toISOString(timestamp: number | string | null | undefined): string {
  if (timestamp === null || timestamp === undefined) {
    return "";
  }

  try {
    let date: Date;

    if (typeof timestamp === "number") {
      date =
        timestamp < 10000000000
          ? new Date(timestamp * 1000)
          : new Date(timestamp);
    } else {
      date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toISOString().replace("Z", "");
  } catch {
    return "";
  }
}

function truncateHash(hash: string, chars: number = 8): string {
  if (hash.length <= chars * 2) return hash;
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}

async function searchTx(hash: string): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchTxResponse, { hash: string }>(
      SEARCH_TX_QUERY,
      { hash },
    );
    const tx = result.mini_tx_detail?.[0];
    if (!tx) return null;

    return {
      url: `/tx/${tx.tx_hash}`,
      ident: tx.tx_hash,
      title: `Transaction ${truncateHash(tx.tx_hash)}`,
      category: "tx",
      extra: {
        icon: "time",
        type: "time",
        value: toISOString(tx.tx_timestamp),
      },
    };
  } catch {
    return null;
  }
}

async function searchBlockByHash(hash: string): Promise<MiscSearch | null> {
  try {
    const byteaHash = `\\x${hash}`;
    const result = await gql<SearchBlockResponse, { hash: string }>(
      SEARCH_BLOCK_BY_HASH_QUERY,
      { hash: byteaHash },
    );
    const block = result.block?.[0];
    if (!block) return null;

    return {
      url: `/block/${normalizeHash(block.hash)}`,
      ident: normalizeHash(block.hash),
      title: `Block #${block.block_no}`,
      category: "block",
      extra: {
        icon: "time",
        type: "time",
        value: toISOString(block.time),
      },
    };
  } catch {
    return null;
  }
}

async function searchBlockByNo(blockNo: number): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchBlockResponse, { blockNo: number }>(
      SEARCH_BLOCK_BY_NO_QUERY,
      { blockNo },
    );
    const block = result.block?.[0];
    if (!block) return null;

    return {
      url: `/block/${normalizeHash(block.hash)}`,
      ident: normalizeHash(block.hash),
      title: `Block #${block.block_no}`,
      category: "block",
      extra: {
        icon: "time",
        type: "time",
        value: toISOString(block.time),
      },
    };
  } catch {
    return null;
  }
}

async function searchPool(poolHash: string): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchPoolResponse, { poolHash: string }>(
      SEARCH_POOL_QUERY,
      { poolHash },
    );
    const pool = result.mini_pool_detail?.[0];
    if (!pool) return null;

    return {
      url: `/pool/${pool.encode}`,
      ident: pool.encode,
      title:
        pool.description || pool.view || `Pool ${truncateHash(pool.encode)}`,
      category: "pool",
      extra: {
        icon: "hot",
        type: "stake",
        value: pool.view || "",
      },
    };
  } catch {
    return null;
  }
}

async function searchAsset(fingerprint: string): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchAssetResponse, { fingerprint: string }>(
      SEARCH_ASSET_QUERY,
      { fingerprint },
    );
    const asset = result.mini_asset_detail?.[0];
    if (!asset) return null;

    return {
      url: `/asset/${asset.fingerprint}`,
      ident: asset.fingerprint,
      title: asset.name || asset.fingerprint,
      category: "asset",
      extra: {
        icon: "balance",
        type: "balance",
        value: asset.quantity.toString(),
      },
    };
  } catch {
    return null;
  }
}

async function searchAddress(address: string): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchAddressResponse, { address: string }>(
      SEARCH_ADDRESS_QUERY,
      { address },
    );
    const addr = result.mini_get_address?.[0];
    if (!addr) return null;

    return {
      url: `/address/${addr.address}`,
      ident: addr.address,
      title: `Address ${truncateHash(addr.address, 12)}`,
      category: "address",
      extra: {
        icon: "balance",
        type: "balance",
        value: `${formatAda(addr.balance)} ADA`,
      },
    };
  } catch {
    return null;
  }
}

async function searchStake(stakeView: string): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchStakeResponse, { stakeView: string }>(
      SEARCH_STAKE_QUERY,
      { stakeView },
    );
    const stake = result.mini_account_detail?.[0];
    if (!stake) return null;

    return {
      url: `/stake/${stake.stake_view}`,
      ident: stake.stake_view,
      title: `Stake ${truncateHash(stake.stake_view, 12)}`,
      category: "stake",
      extra: {
        icon: "balance",
        type: "stake",
        value: `${formatAda(stake.total_balance)} ADA`,
      },
    };
  } catch {
    return null;
  }
}

async function searchScript(scriptHash: string): Promise<MiscSearch | null> {
  try {
    const result = await gql<SearchScriptResponse, { scriptHash: string }>(
      SEARCH_SCRIPT_QUERY,
      { scriptHash },
    );
    const script = result.mini_script_detail?.[0];
    if (!script) return null;

    return {
      url: `/script/${script.script_hash}`,
      ident: script.script_hash,
      title: `${script.type} Script`,
      category: "policy",
      extra: {
        icon: "hot",
        type: "balance",
        value: script.size ? `${script.size} bytes` : "",
      },
    };
  } catch {
    return null;
  }
}

async function performSearch(
  query: string,
  category?: string,
): Promise<MiscSearch[]> {
  const queryType = detectQueryType(query);
  const results: MiscSearch[] = [];

  const searchPromises: Promise<MiscSearch | null>[] = [];

  if (queryType.maybeTx) {
    searchPromises.push(searchTx(queryType.normalized));
  }

  if (queryType.maybeBlock) {
    if (queryType.isNumeric) {
      searchPromises.push(searchBlockByNo(parseInt(queryType.normalized, 10)));
    } else {
      searchPromises.push(searchBlockByHash(queryType.normalized));
    }
  }

  if (queryType.maybePool) {
    searchPromises.push(searchPool(query.trim()));
  }

  if (queryType.maybeAsset) {
    searchPromises.push(searchAsset(query.trim()));
  }

  if (queryType.maybeAddress) {
    searchPromises.push(searchAddress(query.trim()));
  }

  if (queryType.maybeStake) {
    searchPromises.push(searchStake(query.trim()));
  }

  if (queryType.maybeScript) {
    searchPromises.push(searchScript(queryType.normalized));
  }

  const searchResults = await Promise.allSettled(searchPromises);

  for (const result of searchResults) {
    if (result.status === "fulfilled" && result.value !== null) {
      results.push(result.value);
    }
  }

  if (category && category !== "all") {
    return results.filter(r => r.category === category);
  }

  return results;
}

export const useFetchMiscSearch = (
  query: string | undefined,
  category?: string,
): UseQueryResult<
  MiscSearchResponse & { prevOffset: number | undefined },
  unknown
> => {
  return useQuery({
    queryKey: ["miscSearch", query, category],
    queryFn: async (): Promise<
      MiscSearchResponse & { prevOffset: number | undefined }
    > => {
      if (!query || query.length < 3) {
        return {
          code: 200,
          data: [],
          tokens: 0,
          ex: 0,
          debug: false,
          prevOffset: undefined,
        };
      }

      const startTime = Date.now();
      const results = await performSearch(query, category);
      const executionTime = Date.now() - startTime;

      return {
        code: 200,
        data: results,
        tokens: 0,
        ex: executionTime,
        debug: false,
        prevOffset: undefined,
      };
    },
    enabled: !!query && query.length >= 3,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};
