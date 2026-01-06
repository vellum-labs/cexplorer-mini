import type {
  AssetListTableColumns,
  AssetListTableOptions,
} from "@/types/tableTypes";

import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

export const useAssetListTableStore = handlePersistStore<
  AssetListTableOptions,
  {
    setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
    setIsResponsive: (isResponsive: boolean) => void;
    setRows: (rows: number) => void;
    setColumsOrder: (columnsOrder: (keyof AssetListTableColumns)[]) => void;
  }
>(
  "asset_list_table_store",
  {
    columnsVisibility: {
      type: true,
      asset: true,
      policy_id: true,
      supply: true,
      minted: true,
    },
    isResponsive: true,
    rows: 20,
    columnsOrder: ["type", "asset", "policy_id", "supply", "minted"],
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
