import type { FC } from "react";
import type { DrepListTableColumns } from "@/types/tableTypes";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useDrepListTableStore } from "@/stores/tables/drepListTableStore";
import { drepListTableOptions } from "@/constants/tables/drepListTableOptions";
import { useDrepList } from "@/hooks/useDrepList";

export const DrepListPage: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useDrepListTableStore();

  const { columns, items } = useDrepList();

  return (
    <PageBase
      title='DReps'
      breadcrumbItems={[{ label: "DRep" }]}
      metadataTitle='drepList'
    >
      <TableList
        title='All DReps'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof DrepListTableColumns) -
            columnsOrder.indexOf(b.key as keyof DrepListTableColumns)
          );
        })}
        columnsOptions={drepListTableOptions.map(item => {
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
