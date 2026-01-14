import type { FC } from "react";
import { DateCell } from "@vellumlabs/cexplorer-sdk";
import { Badge } from "@vellumlabs/cexplorer-sdk";
import { TableList } from "@/components/global/TableList";
import { HashCell } from "@/components/tx/HashCell";

export const AssetMintTab: FC = () => {
  const columns = [
    {
      key: "asset_minted",
      render: () => <DateCell time='2026-01-04T21:44:52' />,
      title: "Asset Minted",
      visible: true,
      widthPx: 60,
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
      key: "tx",
      render: () => (
        <HashCell hash='31d561f459cb7d982b0910d4c35fb7ad6801e72536df674ead26318e6562e332' />
      ),
      title: "Tx",
      visible: true,
      widthPx: 100,
    },
    {
      key: "mint_quantity",
      render: () => <p className='text-right'>5</p>,
      title: <p className='w-full text-right'>Mint Quantity</p>,
      visible: true,
      widthPx: 100,
    },
  ];

  return (
    <TableList
      columns={columns}
      items={Array.from({ length: 20 }, () => ({ todo: true }))}
      storeKey='asset_mint_tab'
    />
  );
};
