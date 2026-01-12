import type { FC } from "react";
import { DateCell } from "@vellumlabs/cexplorer-sdk";
import { GlobalTable } from "@vellumlabs/cexplorer-sdk";
import { useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@vellumlabs/cexplorer-sdk";

interface AssetMintTabProps {
  name?: number;
  policy?: string;
  policyId?: string;
}

export const AssetMintTab: FC<AssetMintTabProps> = ({
  name,
  policy,
  policyId,
}) => {
  const assetname = policy && name ? policy + name : undefined;
  const { page } = useSearch({
    from: policyId ? "/policy/$policyId" : "/asset/$fingerprint",
  });

  const [totalItems, setTotalItems] = useState(0);

  const mintQuery = { data: { pages: [] }, isLoading: false };
  const items = [];

  const columns = [
    {
      key: "order",
      render: () => <></>,
      title: "#",
      visible: true,
      standByRanking: true,
      widthPx: 10,
    },
    {
      key: "type",
      render: (item: any) => {
        if (item?.quantity > 1) {
          return <Badge color='blue'>Token</Badge>;
        }
        return <Badge color='yellow'>NFT</Badge>;
      },
      title: "Type",
      visible: true,
      widthPx: 50,
    },
    {
      key: "asset",
      render: () => {
        return <span className='text-primary'>Asset</span>;
      },
      title: "Asset",
      visible: true,
      widthPx: 130,
    },
    {
      key: "asset_minted",
      render: (item: any) => <DateCell time={item?.tx?.time ?? ""} />,
      title: "Asset Minted",
      visible: true,
      widthPx: 60,
    },
    {
      key: "mint_quantity",
      render: (item: any) => (
        <p className='text-right'>
          {item?.quantity ? item.quantity : "-"}
        </p>
      ),
      title: <p className='w-full text-right'>Mint Quantity</p>,
      visible: true,
      widthPx: 100,
    },
    {
      key: "tx",
      render: (item: any) => (
        <span className='text-primary'>{item?.tx?.hash}</span>
      ),
      title: "Tx",
      visible: true,
      widthPx: 100,
    },
  ];

  return (
    <GlobalTable
      type='infinite'
      currentPage={page ?? 1}
      totalItems={totalItems}
      itemsPerPage={10}
      scrollable
      query={mintQuery}
      items={items}
      columns={columns}
      onOrderChange={() => {}}
    />
  );
};
