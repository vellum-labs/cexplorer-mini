import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

export const BlockListPage: FC = () => {
  return (
    <PageBase
      metadataTitle='blockList'
      title='Blocks'
      breadcrumbItems={[{ label: "Blocks" }]}
    >
      <></>
    </PageBase>
  );
};
