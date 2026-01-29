import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { usePoolList } from "@/hooks/usePoolList";

export const PoolListPage: FC = () => {
  const { columns, items, loading, fetching, hasNextPage, fetchNextPage } = usePoolList();

  return (
    <PageBase
      metadataTitle='poolList'
      title='Cardano Stake Pools'
      breadcrumbItems={[{ label: "Pools" }]}
    >
      <TableList
        title='All stake pools'
        storeKey='pool_list'
        columns={columns}
        items={items}
        showMoreButton={hasNextPage}
        onFetch={fetchNextPage}
        loading={loading}
        fetching={fetching}
      />
    </PageBase>
  );
};
