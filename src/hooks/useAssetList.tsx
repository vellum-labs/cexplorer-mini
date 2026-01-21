import type { Column } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";

import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";

interface UseAssetListReturn {
  items: Record<string, any>[];
  columns: Column<Record<string, unknown>>[];
}

export const useAssetList = (): UseAssetListReturn => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    type: i % 2 === 0 ? "NFT" : "FT",
    asset: `Asset ${i + 1}`,
    policy_id: `policy${i.toString().padStart(56, "0")}`,
    supply: 1000000000,
    minted: 100000,
  }));

  const columns = [
    {
      key: "type",
      render: item => {
        if (item?.type === "FT") {
          return <Badge color='blue'>Token</Badge>;
        }

        return <Badge color='yellow'>NFT</Badge>;
      },
      title: <p>Type</p>,

      widthPx: 40,
    },
    {
      key: "asset",
      render: item => {
        if (!item?.asset) {
          return "-";
        }

        return (
          <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
            <Link
              to='/asset/$fingerprint'
              params={{ fingerprint: item?.asset }}
              title={item?.asset}
              className='text-primary'
            >
              <p className='break-words break-all'>
                {formatString(item?.asset, "long")}
              </p>
            </Link>
          </span>
        );
      },
      title: <p>Asset</p>,

      widthPx: 80,
    },
    {
      key: "policy_id",
      render: item => {
        if (!item?.policy_id) {
          return "-";
        }

        return (
          <p className='break-words break-all text-grayTextPrimary text-text'>
            {formatString(item?.policy_id, "long")}
          </p>
        );
      },
      title: <p>Policy ID</p>,

      widthPx: 120,
    },
    {
      key: "supply",
      render: item => {
        if (typeof item?.supply === "undefined") {
          return <p className='text-right'>-</p>;
        }

        return <p className='text-right'>{formatNumber(item.supply)}</p>;
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Supply</span>
        </div>
      ),

      widthPx: 60,
    },
    {
      key: "minted",
      render: item => {
        if (typeof item?.minted === "undefined") {
          return <p className='text-right'>-</p>;
        }

        return <p className='text-right'>{formatNumber(item.minted)}</p>;
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Minted</span>
        </div>
      ),

      widthPx: 60,
    },
  ];

  return {
    items,
    columns,
  };
};
