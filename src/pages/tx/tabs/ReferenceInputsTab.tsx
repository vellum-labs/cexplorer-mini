import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";
import { AdaWithTooltip, Copy, formatString } from "@vellumlabs/cexplorer-sdk";

export const ReferenceInputsTab: FC = () => {
  const columns = [
    {
      key: "address",
      render: () => {
        const view =
          "stake1u9zjr6e37w53a474puhx606ayr3rz2l6jljrmzvlzkk3cmg0m2zw0";

        const isStake = view.includes("stake");

        return (
          <div className='flex items-center gap-1/2'>
            <Link
              className='text-primary'
              to={isStake ? "/stake/$stakeAddr" : "/address/$address"}
              params={isStake ? { stakeAddr: view } : { address: view || "" }}
            >
              {formatString(view, "long")}
            </Link>
            <Copy copyText={view} />
          </div>
        );
      },
      title: "Address",
      widthPx: 90,
    },
    {
      key: "tx",
      render: () => {
        const tx = "bd0cf286c048f602ac242b4fb79...e99a4f5c30d3b2ffb54d83";

        return (
          <p className='flex items-center gap-1 text-primary' title={tx}>
            <Link
              to='/tx/$hash'
              params={{ hash: tx }}
              className='flex justify-end text-primary'
            >
              {formatString(tx, "long")}
            </Link>
            <Copy copyText={tx} className='stroke-grayText' />
          </p>
        );
      },
      title: "Transaction",
      widthPx: 80,
    },
    {
      key: "block",
      render: () => {
        return <AdaWithTooltip data={456465654} />;
      },
      title: <p className='w-full text-right'>Collateral</p>,
      widthPx: 55,
    },
  ];

  return (
    <TableList
      withPadding={false}
      columns={columns}
      items={Array.from({ length: 20 }, () => ({ todo: true }))}
      storeKey='reference_inputs_tab_list'
    />
  );
};
