import type { Column } from "@/components/global/TableList";
import { handlePersistStore } from "@vellumlabs/cexplorer-sdk";

interface TableOptionsCore {
  columnsVisibility: Record<string, boolean>;
  rows: number;
  columnsOrder: string[];
}

export const useTableStore = (
  storeKey: string,
  columns: Column<Record<string, unknown>>[],
) => {
  const columnsKeys = columns.map(item => item.key);

  const columnsVisibility = columnsKeys.reduce((acc, curr) => {
    acc[curr] = true;

    return acc;
  }, {});

  return handlePersistStore<
    TableOptionsCore,
    {
      setColumnVisibility: (columnKey: string, isVisible: boolean) => void;
      setRows: (rows: number) => void;
      setColumsOrder: (columnsOrder: string[]) => void;
    }
  >(
    storeKey + "_table_store",
    {
      columnsVisibility,
      rows: 20,
      columnsOrder: columnsKeys,
    },
    set => ({
      setColumnVisibility: (columnKey, isVisible) =>
        set(state => {
          state.columnsVisibility[columnKey] = isVisible;
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
};
