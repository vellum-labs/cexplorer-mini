import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useAssetList } from "@/hooks/useAssetList";

interface AssetListPageProps {
  tab?: boolean;
}

export const AssetListPage: FC<AssetListPageProps> = ({ tab = false }) => {
  const { columns, items } = useAssetList();

  return (
    <PageBase
      title='Assets'
      breadcrumbItems={[{ label: "Assets" }]}
      metadataTitle='assetsList'
      showHeader={!tab}
      showMetadata={!tab}
    >
      <TableList
        title='All Assets'
        columns={columns}
        items={items}
        storeKey='asset_list'
        withPadding={!tab}
      />
    </PageBase>
  );
};
