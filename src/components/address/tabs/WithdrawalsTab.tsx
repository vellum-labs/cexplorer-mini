import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { BlockCell } from "@vellumlabs/cexplorer-sdk/BlockCell";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

export const WithdrawalsTab: FC = () => {
  const items = Array.from({ length: 20 }, () => ({
    block: {
      time: "2026-01-04T21:44:52",
      epoch_no: 601,
      no: 3213123,
      hash: "dsadasdas",
    },
    amount: 321321312,
    tx: {
      hash: "dsajkbhdjlkasdewqenlwqenlewq",
      fee: 2312312,
    },
  }));

  const columns = [
    {
      key: "date",
      render: item => <DateCell time={item?.block.time} />,
      jsonFormat: item => {
        if (!item?.block.time) {
          return "-";
        }

        return item?.block.time;
      },
      title: "Date",
      widthPx: 50,
    },
    {
      key: "hash",
      render: item => (
        <p
          className='flex items-center gap-1 text-primary'
          title={item.tx.hash}
        >
          <Link
            to='/tx/$hash'
            params={{ hash: item.tx.hash }}
            className='flex justify-end text-primary'
          >
            {formatString(item.tx.hash, "long")}
          </Link>
          <Copy copyText={item?.tx?.hash} className='stroke-grayText' />
        </p>
      ),
      title: "Hash",
      widthPx: 80,
    },
    {
      key: "block",
      render: item => {
        return (
          <div className='flex items-center justify-end gap-[2px] text-primary'>
            <EpochCell no={item?.block?.epoch_no} />
            /
            <BlockCell hash={item?.block?.hash} no={item?.block?.no ?? 0} />
          </div>
        );
      },
      title: <p className='w-full text-right'>Epoch / Block</p>,
      widthPx: 55,
    },
    {
      key: "amount",
      render: item => (
        <p className='text-right'>
          <AdaWithTooltip data={item?.amount} />
        </p>
      ),
      title: <p className='w-full text-right'>Amount</p>,
      widthPx: 50,
    },
    {
      key: "fee",
      render: item => (
        <p className='text-right'>
          <AdaWithTooltip data={item.tx?.fee} />
        </p>
      ),
      title: <p className='w-full text-right'>Fee</p>,
      widthPx: 50,
    },
  ];

  return (
    <TableList
      title='All withdrawals'
      withPadding={false}
      columns={columns}
      items={items}
      storeKey='utxo_list'
    />
  );
};
