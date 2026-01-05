import type {
  TxListTableColumns,
  TxListTableOptions,
} from "@/types/tableTypes";

import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

export const useTxListTableStore = handlePersistStore<
  TxListTableOptions,
  {
    setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
    setIsResponsive: (isResponsive: boolean) => void;
    setRows: (rows: number) => void;
    setColumsOrder: (columnsOrder: (keyof TxListTableColumns)[]) => void;
  }
>(
  "tx_list_table_store",
  {
    columnsVisibility: {
      date: true,
      hash: true,
      block: true,
      fee: true,
      size: true,
      total_output: true,
    },
    isResponsive: true,
    rows: 20,
    columnsOrder: ["date", "hash", "block", "total_output", "size", "fee"],
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
