import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

export const AssetListPage: FC = () => {
  return (
    <PageBase
      title='Assets'
      breadcrumbItems={[{ label: "Assets" }]}
      metadataTitle='assetsList'
    >
      <></>
    </PageBase>
  );
};
