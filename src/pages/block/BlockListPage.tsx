import type { FC } from "react";
import type { BlockListColumns } from "@/types/tableTypes";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { blocksListTableOptions } from "@/constants/tables/blocksListTableOptions";

import { useBlockListTableStore } from "@/stores/tables/blockListTableStore";
import { useBlockList } from "@/hooks/useBlockList";

export const BlockListPage: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useBlockListTableStore();

  const { columns, items } = useBlockList();

  return (
    <PageBase
      metadataTitle='blockList'
      title='Blocks'
      breadcrumbItems={[{ label: "Blocks" }]}
    >
      <TableList
        title='All epochs'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof BlockListColumns) -
            columnsOrder.indexOf(b.key as keyof BlockListColumns)
          );
        })}
        columnsOptions={blocksListTableOptions.map(item => {
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
