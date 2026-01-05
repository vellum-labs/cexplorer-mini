import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

export const PoolListPage: FC = () => {
  return (
    <PageBase
      metadataTitle='poolList'
      title='Cardano Stake Pools'
      breadcrumbItems={[{ label: "Pools" }]}
    >
      <></>
    </PageBase>
  );
};
