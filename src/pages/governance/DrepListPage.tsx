import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useDrepList } from "@/hooks/useDrepList";

export const DrepListPage: FC = () => {
  const { columns, items } = useDrepList();

  return (
    <PageBase
      title='DReps'
      breadcrumbItems={[{ label: "DRep" }]}
      metadataTitle='drepList'
    >
      <TableList
        title='All DReps'
        columns={columns}
        storeKey='drep_list'
        items={items}
      />
    </PageBase>
  );
};
