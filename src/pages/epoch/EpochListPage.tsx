import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

export const EpochListPage: FC = () => {
  return (
    <PageBase
      metadataTitle='epochsList'
      title='Epochs'
      breadcrumbItems={[{ label: "Epochs" }]}
    >
      <></>
    </PageBase>
  );
};
