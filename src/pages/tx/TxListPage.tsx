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
  address?: string;
  fingerprint?: string;
}

export const TxListPage: FC<TxListPageProps> = ({
  tab = false,
  txData,
  hideColumns = [],
  showLoadMore = true,
  address,
  fingerprint,
}) => {
  const { columns, items, loading, fetching, hasNextPage, fetchNextPage } = useTxList(
    txData,
    hideColumns,
    { address, fingerprint },
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
        withPadding={!tab}
        columns={columns}
        items={items}
        storeKey='tx_list'
        showMoreButton={showLoadMore && hasNextPage}
        onFetch={fetchNextPage}
        loading={loading}
        fetching={fetching}
      />
    </PageBase>
  );
};
