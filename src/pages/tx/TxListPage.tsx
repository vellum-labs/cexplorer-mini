import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

export const TxListPage: FC = () => {
  return (
    <PageBase
      metadataTitle='transactionList'
      title='Transactions'
      breadcrumbItems={[{ label: "Transactions" }]}
    >
      <></>
    </PageBase>
  );
};
