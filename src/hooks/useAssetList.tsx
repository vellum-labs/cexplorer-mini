import type { Column } from "@/components/global/TableList";
import type { AssetListResponse } from "@/services/asset";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { Link } from "@tanstack/react-router";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";

import { useFetchAssetList } from "@/services/asset";

interface UseAssetListReturn {
  items: any[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<AssetListResponse, unknown>, Error>
  >;
  hasNextPage: boolean;
  loading: boolean;
}

export const useAssetList = (): UseAssetListReturn => {
  const {
    data: assetData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchAssetList(20);

  const items = assetData?.pages.flatMap(page => page.mini_asset_detail);

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

        let decodedName = name;
        try {
          if (/^[0-9a-fA-F]+$/.test(name) && name.length % 2 === 0) {
            const bytes = name.match(/.{2}/g)?.map(b => parseInt(b, 16)) ?? [];
            const decoded = String.fromCharCode(...bytes);
            if (/^[\x20-\x7E]+$/.test(decoded)) {
              decodedName = decoded;
            } else {
              decodedName = formatString(name, "long");
            }
          }
        } catch {
          decodedName = formatString(name, "long");
        }

        return (
          <p className='text-grayTextPrimary' title={name}>
            {decodedName}
          </p>
        );
      },
      title: <p>Name</p>,
      widthPx: 80,
    },
    {
      key: "policy_id",
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
    loading: isLoading,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
