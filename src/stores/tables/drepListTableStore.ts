import type {
  DrepListTableColumns,
  DrepListTableOptions,
} from "@/types/tableTypes";

import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

export const useDrepListTableStore = handlePersistStore<
  DrepListTableOptions,
  {
    setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
    setIsResponsive: (isResponsive: boolean) => void;
    setRows: (rows: number) => void;
    setColumsOrder: (columnsOrder: (keyof DrepListTableColumns)[]) => void;
  }
>(
  "drep_list_table_store",
  {
    columnsVisibility: {
      drep_name: true,
      metadata: true,
      registered: true,
      status: true,
      voting_power: true,
      delegators: true,
    },
    isResponsive: true,
    rows: 20,
    columnsOrder: [
      "status",
      "drep_name",
      "voting_power",
      "delegators",
      "registered",
      "metadata",
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
