import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useTxList } from "@/hooks/useTxList";

interface TxListPageProps {
  tab?: boolean;
}

export const TxListPage: FC<TxListPageProps> = ({ tab = false }) => {
  const { columns, items } = useTxList();

  return (
    <PageBase
      metadataTitle='transactionList'
      title='Transactions'
      breadcrumbItems={[{ label: "Transactions" }]}
      showHeader={!tab}
      showMetadata={!tab}
    >
      <TableList
        title={tab ? "" : "Recent network transactions"}
        columns={columns}
        items={items}
        storeKey='tx_list'
      />
    </PageBase>
  );
};
