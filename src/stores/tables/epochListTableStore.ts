import type { EpochListColumns, EpochTableOptions } from "@/types/tableTypes";

import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

export const useEpochListTableStore = handlePersistStore<
  EpochTableOptions,
  {
    setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
    setIsResponsive: (isResponsive: boolean) => void;
    setRows: (rows: number) => void;
    setColumsOrder: (columnsOrder: (keyof EpochListColumns)[]) => void;
  }
>(
  "epoch_list_table_store",
  {
    columnsVisibility: {
      blocks: true,
      end_time: true,
      epoch: true,
      fees: true,
      output: true,
      rewards: true,
      stake: true,
      start_time: true,
      txs: true,
    },
    isResponsive: true,
    rows: 20,
    columnsOrder: [
      "epoch",
      "start_time",
      "end_time",
      "stake",
      "rewards",
      "blocks",
      "txs",
      "output",
      "fees",
    ],
  },
  set => ({
    setColumnVisibility: (columnKey, isVisible) =>
      set(state => {
        state.columnsVisibility[columnKey] = isVisible;
      }),
    setIsResponsive: isResponsive =>
      set(state => {
        state.isResponsive = isResponsive;
      }),
    setRows: rows =>
      set(state => {
        state.rows = rows;
      }),
    setColumsOrder: columnsOrder =>
      set(state => {
        state.columnsOrder = columnsOrder;
      }),
  }),
);
