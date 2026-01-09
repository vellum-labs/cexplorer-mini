import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useAssetList } from "@/hooks/useAssetList";

export const AssetListPage: FC = () => {
  const { columns, items } = useAssetList();

  return (
    <PageBase
      title='Assets'
      breadcrumbItems={[{ label: "Assets" }]}
      metadataTitle='assetsList'
    >
      <TableList
        title='All Assets'
        columns={columns}
        items={items}
        storeKey='asset_list'
      />
    </PageBase>
  );
};
