import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useBlockList } from "@/hooks/useBlockList";

interface BlockListPageProps {
  tab?: boolean;
  epochNo?: number;
}

export const BlockListPage: FC<BlockListPageProps> = ({
  tab = false,
  epochNo,
}) => {
  const { columns, items, hasNextPage, loading, fetchNextPage } =
    useBlockList(epochNo);

  return (
    <PageBase
      metadataTitle='blockList'
      title='Blocks'
      breadcrumbItems={[{ label: "Blocks" }]}
      showHeader={!tab}
      showMetadata={!tab}
    >
      <TableList
        title={tab ? "" : "All blocks"}
        storeKey='block_list'
        columns={columns}
        items={items}
        showMoreButton={hasNextPage}
        onFetch={fetchNextPage}
        loading={loading}
      />
    </PageBase>
  );
};
