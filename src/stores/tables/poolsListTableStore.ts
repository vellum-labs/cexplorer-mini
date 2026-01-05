import type {
  PoolsListColumns,
  PoolsListTableOptions,
} from "@/types/tableTypes";
import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

export const usePoolsListTableStore = handlePersistStore<
  PoolsListTableOptions,
  {
    setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
    setIsResponsive: (isResponsive: boolean) => void;
    setRows: (rows: number) => void;
    setColumsOrder: (columnsOrder: (keyof PoolsListColumns)[]) => void;
  }
>(
  "pools_list_table_store",
  {
    columnsVisibility: {
      blocks: true,
      fees: true,
      luck: true,
      pledge: true,
      pool: true,
      rewards: true,
      stake: true,
      delegators: false,
    },
    isResponsive: true,
    rows: 20,
    columnsOrder: [
      "pool",
      "stake",
      "rewards",
      "luck",
      "fees",
      "blocks",
      "delegators",
      "pledge",
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
