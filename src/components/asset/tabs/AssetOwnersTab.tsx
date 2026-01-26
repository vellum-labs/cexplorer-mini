import type { FC } from "react";
import { useMemo } from "react";

import { TableList } from "@/components/global/TableList";
import { AddressTypeInitialsBadge } from "@vellumlabs/cexplorer-sdk/AddressTypeInitialsBadge";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";
import { useFetchMaTxOut, useFetchTxOut } from "@/services/asset";

interface AssetOwnersTabProps {
  assetId?: number;
}

interface OwnerData {
  address: string;
  quantity: number;
  rank: number;
}

export const AssetOwnersTab: FC<AssetOwnersTabProps> = ({ assetId }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchMaTxOut(
    assetId,
    100
  );

  const maTxOuts = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.ma_tx_out ?? []);
  }, [data]);

  const txOutIds = useMemo(() => maTxOuts.map(m => m.tx_out_id), [maTxOuts]);

  const { data: txOutData, isLoading: txOutLoading } = useFetchTxOut(txOutIds);

  const owners: OwnerData[] = useMemo(() => {
    if (!txOutData?.tx_out) return [];

    const txOutMap = new Map<number, string>();
    txOutData.tx_out.forEach(out => {
      txOutMap.set(out.id, out.address);
    });

    const addressQuantities = new Map<string, number>();
    maTxOuts.forEach(maTxOut => {
      const address = txOutMap.get(maTxOut.tx_out_id);
      if (address) {
        const current = addressQuantities.get(address) || 0;
        addressQuantities.set(address, current + Number(maTxOut.quantity));
      }
    });

    return Array.from(addressQuantities.entries())
      .map(([address, quantity]) => ({ address, quantity, rank: 0 }))
      .sort((a, b) => b.quantity - a.quantity)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [maTxOuts, txOutData]);

  const columns = [
    {
      key: "order",
      render: (item: OwnerData) => (
        <span className='text-gray-500'>{item.rank}</span>
      ),
      title: "#",
      visible: true,
      widthPx: 10,
    },
    {
      key: "type",
      render: (item: OwnerData) => (
        <AddressTypeInitialsBadge address={item.address} />
      ),
      title: "Type",
      visible: true,
      widthPx: 30,
    },
    {
      key: "owner",
      render: (item: OwnerData) => (
        <div className='flex items-center gap-1'>
          <Link
            to='/address/$address'
            params={{ address: item.address }}
            className='block overflow-hidden overflow-ellipsis whitespace-nowrap text-text-sm text-primary'
          >
            <span>{formatString(item.address, "longer")}</span>
          </Link>
          <Copy copyText={item.address} />
        </div>
      ),
      title: "Owner",
      visible: true,
      widthPx: 150,
    },
    {
      key: "quantity",
      render: (item: OwnerData) => (
        <p className='text-right'>{formatNumber(item.quantity)}</p>
      ),
      title: <p className='w-full text-right'>Quantity</p>,
      visible: true,
      widthPx: 65,
    },
  ];

  return (
    <TableList
      columns={columns}
      items={owners}
      storeKey='asset_owners_tab_list'
      loading={isLoading || txOutLoading}
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
    />
  );
};
