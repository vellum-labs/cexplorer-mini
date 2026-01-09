import type { Column } from "@/components/global/TableList";

import { formatNumber } from "@vellumlabs/cexplorer-sdk";

interface UseAssetListReturn {
  items: Record<string, unknown>[];
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
        if (!item?.type) {
          return "-";
        }

        return <span>{item.type}</span>;
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

        return <span>{item.asset}</span>;
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
          <span className='truncate' title={item.policy_id as string}>
            {item.policy_id}
          </span>
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
