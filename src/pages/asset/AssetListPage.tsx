import type { FC } from "react";
import type { AssetListTableColumns } from "@/types/tableTypes";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { assetListTableOptions } from "@/constants/tables/assetListTableOptions";

import { useAssetListTableStore } from "@/stores/tables/assetListTableStore";
import { useAssetList } from "@/hooks/useAssetList";

export const AssetListPage: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useAssetListTableStore();

  const { columns, items } = useAssetList();

  return (
    <PageBase
      title='Assets'
      breadcrumbItems={[{ label: "Assets" }]}
      metadataTitle='assetsList'
    >
      <TableList
        title='All Assets'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof AssetListTableColumns) -
            columnsOrder.indexOf(b.key as keyof AssetListTableColumns)
          );
        })}
        columnsOptions={assetListTableOptions.map(item => {
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
