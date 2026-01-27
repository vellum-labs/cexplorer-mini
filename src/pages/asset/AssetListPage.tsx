import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useAssetList } from "@/hooks/useAssetList";
import type { AddressAsset } from "@/services/address";

interface AssetListPageProps {
  tab?: boolean;
  assetData?: AddressAsset[] | null;
  loading?: boolean;
}

export const AssetListPage: FC<AssetListPageProps> = ({ tab = false, assetData, loading: externalLoading }) => {
  const { columns, items, loading, hasNextPage, fetchNextPage } = useAssetList(assetData);

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
        loading={externalLoading ?? loading}
        showMoreButton={hasNextPage}
        onFetch={fetchNextPage}
      />
    </PageBase>
  );
};
