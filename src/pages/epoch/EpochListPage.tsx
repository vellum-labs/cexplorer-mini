import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useEpochList } from "@/hooks/useEpochList";

export const EpochListPage: FC = () => {
  const { columns, items, loading, hasNextPage, fetchNextPage } =
    useEpochList();

  return (
    <PageBase
      metadataTitle='epochsList'
      title='Epochs'
      breadcrumbItems={[{ label: "Epochs" }]}
    >
      <TableList
        title='All epochs'
        storeKey='epoch_list'
        columns={columns}
        items={items}
        showMoreButton={hasNextPage}
        onFetch={fetchNextPage}
        loading={loading}
      />
    </PageBase>
  );
};
