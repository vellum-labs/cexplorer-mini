import type { Column } from "@/components/global/TableList";
import { HashCell } from "@/components/tx/HashCell";

import {
  AdaWithTooltip,
  BlockCell,
  DateCell,
  EpochCell,
  SizeCell,
} from "@vellumlabs/cexplorer-sdk";

import { useTxListTableStore } from "@/stores/tables/txListTableStore";

interface UseTxListReturn {
  items: Record<string, unknown>[];
  columns: Column<Record<string, unknown>>[];
}

export const useTxList = (): UseTxListReturn => {
  const { columnsVisibility } = useTxListTableStore();

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

  return {
    items,
    columns,
  };
};
