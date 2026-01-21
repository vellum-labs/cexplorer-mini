import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useTxList } from "@/hooks/useTxList";
import type { TxData } from "@/services/block";

interface TxListPageProps {
  tab?: boolean;
  txData?: TxData[];
  hideColumns?: string[];
  showLoadMore?: boolean;
}

export const TxListPage: FC<TxListPageProps> = ({
  tab = false,
  txData,
  hideColumns = [],
  showLoadMore = true,
}) => {
  const { columns, items, hasNextPage, fetchNextPage } = useTxList(
    txData,
    hideColumns,
  );

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
        showMoreButton={showLoadMore && hasNextPage}
        onFetch={fetchNextPage}
      />
    </PageBase>
  );
};
