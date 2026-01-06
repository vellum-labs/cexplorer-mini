import type {
  AddressListTableColumns,
  AddressListTableOptions,
} from "@/types/tableTypes";

import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

export const useAddressListTableStore = handlePersistStore<
  AddressListTableOptions,
  {
    setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
    setIsResponsive: (isResponsive: boolean) => void;
    setRows: (rows: number) => void;
    setColumsOrder: (columnsOrder: (keyof AddressListTableColumns)[]) => void;
  }
>(
  "address_list_table_store",
  {
    columnsVisibility: {
      account: true,
      live_stake: true,
      pool_delegation: true,
      drep_delegation: true,
    },
    isResponsive: true,
    rows: 20,
    columnsOrder: [
      "account",
      "live_stake",
      "pool_delegation",
      "drep_delegation",
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
