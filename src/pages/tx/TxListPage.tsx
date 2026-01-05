import type { TxListTableColumns } from "@/types/tableTypes";
import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import {
  AdaWithTooltip,
  BlockCell,
  DateCell,
  EpochCell,
  SizeCell,
} from "@vellumlabs/cexplorer-sdk";
import { HashCell } from "@/components/tx/HashCell";

import { useTxListTableStore } from "@/stores/tables/txListTableStore";

import { txListTableOptions } from "@/constants/tables/txListTableOptions";
import { TableList } from "@/components/global/TableList";

export const TxListPage: FC = () => {
  const {
    columnsVisibility,
    rows,
    columnsOrder,
    setColumnVisibility,
    setRows,
    setColumsOrder,
  } = useTxListTableStore();

  const items = Array.from({ length: 20 }, () => ({
    time: "2026-01-05T04:36:36",
    hash: "b62b9e00b04094b6d9c17c3b0dabe65fca8bb59d3244db85ccb644184ada98e0",
    block: {
      epoch_no: 456,
      no: 12868010,
      hash: "7489e5e0e7baa6bb4dbed7451ee0727b0d343d34042170e21264ac44b0603e16",
    },
    out_sum: 800000000,
    size: 289,
    fee: 420981,
  }));

  const columns = [
    {
      key: "date",
      render: item => <DateCell time={item.time} />,
      title: "Date",
      visible: columnsVisibility.date,
      widthPx: 50,
    },
    {
      key: "hash",
      render: item => <HashCell hash={item.hash} />,
      title: "Hash",
      visible: columnsVisibility.hash,
      widthPx: 60,
    },
    {
      key: "block",
      render: item => (
        <div className='flex items-center justify-end gap-[2px] text-primary'>
          <EpochCell no={item?.block?.epoch_no} />
          /
          <BlockCell hash={item?.block?.hash} no={item?.block?.no ?? 0} />
        </div>
      ),
      title: <p className='w-full text-right'>Epoch / Block</p>,
      visible: columnsVisibility.block,
      widthPx: 40,
    },
    {
      key: "total_output",
      render: item => (
        <span className='flex items-center justify-end'>
          <AdaWithTooltip data={item?.out_sum ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Total Output</p>,
      visible: columnsVisibility.total_output,
      widthPx: 50,
    },
    {
      key: "size",
      render: item => <SizeCell size={item.size} maxSize={16384} />,
      title: <p className='w-full text-right'>Size</p>,
      visible: columnsVisibility.size,
      widthPx: 50,
    },
    {
      key: "fee",
      render: item => (
        <span className='flex items-center justify-end'>
          <AdaWithTooltip data={item?.fee ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Fee</p>,
      visible: columnsVisibility.fee,
      widthPx: 40,
    },
  ];

  return (
    <PageBase
      metadataTitle='transactionList'
      title='Transactions'
      breadcrumbItems={[{ label: "Transactions" }]}
    >
      <TableList
        title='Recent network transactions'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof TxListTableColumns) -
            columnsOrder.indexOf(b.key as keyof TxListTableColumns)
          );
        })}
        columnsOptions={txListTableOptions.map(item => {
          return {
            label: item.name,
            isVisible: columnsVisibility[item.key],
            onClick: () =>
              setColumnVisibility(item.key, !columnsVisibility[item.key]),
          };
        })}
        items={items}
        setColumsOrder={setColumsOrder}
        setRows={setRows}
      />
    </PageBase>
  );
};
