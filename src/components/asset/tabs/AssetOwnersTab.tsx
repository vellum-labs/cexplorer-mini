import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import { AddressTypeInitialsBadge } from "@vellumlabs/cexplorer-sdk/AddressTypeInitialsBadge";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

export const AssetOwnersTab: FC = () => {
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
      render: () => (
        <AddressTypeInitialsBadge address='addr1q8elqhkuvtyelgcedpup58r893awhg3l87a4rz5d5acatuj9y84nruafrmta2rewd5l46g8zxy4l49ly8kye79ddr3ksqal35g' />
      ),
      title: "Type",
      visible: true,
      widthPx: 30,
    },
    {
      key: "owner",
      render: () => (
        <div className='flex items-center gap-1'>
          <Link
            to='/address/$address'
            params={{ address: "addr1dsadsadxzczxcasqeqwesxacxz" }}
            className={`block overflow-hidden overflow-ellipsis whitespace-nowrap text-text-sm text-primary`}
          >
            <span>
              {formatString("addr1dsadsadxzczxcasqeqwesxacxz", "longer")}
            </span>
          </Link>
          <Copy copyText='dsadas' />
        </div>
      ),
      title: "Owner",
      visible: true,
      widthPx: 75,
    },
    {
      key: "date",
      render: () => {
        return <DateCell time='2026-01-04T21:44:52' />;
      },
      title: <p className='w-full text-right'>Date</p>,
      visible: true,
      widthPx: 65,
    },
    {
      key: "quantity",
      render: () => {
        return <p className='text-right'>45</p>;
      },
      title: <p className='w-full text-right'>Quantity</p>,
      visible: true,
      widthPx: 65,
    },
  ];

  return (
    <TableList
      columns={columns}
      items={Array.from({ length: 20 }, () => ({ todo: true }))}
      storeKey='asset_owners_tab_list'
    />
  );
};
