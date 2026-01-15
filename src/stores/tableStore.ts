import type { Column } from "@/components/global/TableList";
import { handlePersistStore } from "@vellumlabs/cexplorer-sdk/HandlePersiststore";

interface TableOptionsCore {
  columnsVisibility: Record<string, boolean>;
  rows: number;
  columnsOrder: string[];
}

export const useTableStore = (
  columns: Column<Record<string, unknown>>[],
  storeKey?: string,
) => {
  const columnsKeys = columns.map(item => item.key);

  const columnsVisibility = columnsKeys.reduce((acc, curr) => {
    acc[curr] = true;

    return acc;
  }, {});

  if (!storeKey) {
    return () => ({
      columnsVisibility,
      rows: 20,
      columnsOrder: columnsKeys,
      setColumnVisibility: () => undefined,
      setRows: () => undefined,
      setColumsOrder: () => undefined,
    });
  }

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
