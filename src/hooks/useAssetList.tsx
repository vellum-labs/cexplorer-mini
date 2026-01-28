import type { Column } from "@/components/global/TableList";
import type { AssetListResponse } from "@/services/asset";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import type { AddressAsset } from "@/services/address";

import { Link } from "@tanstack/react-router";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { useQuery } from "@tanstack/react-query";

import { useFetchAssetList, fetchAssetsByPolicies } from "@/services/asset";
import { decodeHexName } from "@/utils/decodeHexName";

interface UseAssetListReturn {
  items: any[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<AssetListResponse, unknown>, Error>
  >;
  hasNextPage: boolean;
  loading: boolean;
}

export const useAssetList = (
  assetData?: AddressAsset[] | null,
): UseAssetListReturn => {
  const isAssetDataProvided = assetData !== undefined;

  const {
    data: fetchedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchAssetList(20);

  const assetNames = assetData?.map(a => a.asset_name).filter(Boolean) ?? [];

  const policies = assetNames
    .filter(name => name.length >= 56)
    .map(name => name.slice(0, 56));
  const uniquePolicies = [...new Set(policies)];

  const { data: enrichedData } = useQuery({
    queryKey: ["assetEnrichment", uniquePolicies],
    queryFn: () => fetchAssetsByPolicies(uniquePolicies),
    enabled: uniquePolicies.length > 0,
  });

  const assetDetailsByPolicyName = new Map(
    enrichedData?.mini_asset_detail?.map(a => [a.policy + a.name, a]) ?? [],
  );

  const items = isAssetDataProvided
    ? (assetData ?? []).map(asset => {
        const details = assetDetailsByPolicyName.get(asset.asset_name);
        const nameOnly =
          asset.asset_name?.length > 56
            ? asset.asset_name.slice(56)
            : asset.asset_name;
        return {
          type: asset.quantity === 1 ? "NFT" : "FT",
          name: nameOnly,
          quantity: asset.quantity,
          fingerprint: details?.fingerprint ?? asset.fingerprint,
          policy: details?.policy ?? asset.policy,
        };
      })
    : fetchedData?.pages.flatMap(page => page.mini_asset_detail);

  const columns = [
    {
      key: "type",
      render: item => {
        const isNFT = item?.quantity === 1;
        if (isNFT) {
          return <Badge color='yellow'>NFT</Badge>;
        }
        return <Badge color='blue'>Token</Badge>;
      },
      title: <p>Type</p>,
      widthPx: 40,
    },
    {
      key: "asset",
      render: item => {
        const fingerprint = item?.fingerprint;
        if (!fingerprint) return "-";

        return (
          <div className='flex items-center gap-1'>
            <Link
              to='/asset/$fingerprint'
              params={{ fingerprint }}
              className='text-primary'
            >
              {formatString(fingerprint, "long")}
            </Link>
            <Copy copyText={fingerprint} />
          </div>
        );
      },
      title: <p>Fingerprint</p>,
      widthPx: 100,
    },
    {
      key: "name",
      render: item => {
        const name = item?.name;
        if (!name) return <span className='text-grayTextSecondary'>-</span>;

        const decodedName = decodeHexName(name);

        return (
          <div className='flex flex-col' title={name}>
            <p className='text-grayTextPrimary'>
              {decodedName ?? formatString(name, "long")}
            </p>
            {decodedName && (
              <p className='text-text-xs text-grayTextSecondary'>
                {formatString(name, "long")}
              </p>
            )}
          </div>
        );
      },
      title: <p>Name</p>,
      widthPx: 80,
    },
    {
      key: "policy",
      render: item => {
        const policy = item?.policy;
        if (!policy) return "-";

        return (
          <div className='flex items-center gap-1'>
            <span className='text-grayTextPrimary'>
              {formatString(policy, "long")}
            </span>
            <Copy copyText={policy} />
          </div>
        );
      },
      title: <p>Policy ID</p>,
      widthPx: 100,
    },
    {
      key: "quantity",
      render: item => {
        if (typeof item?.quantity === "undefined") {
          return <p className='text-right'>-</p>;
        }
        return (
          <p className='text-right text-grayTextPrimary'>
            {formatNumber(item.quantity)}
          </p>
        );
      },
      title: <p className='w-full text-right'>Quantity</p>,
      widthPx: 60,
    },
  ];

  return {
    items,
    loading: isAssetDataProvided ? false : isLoading,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage: isAssetDataProvided ? false : hasNextPage,
  };
};
