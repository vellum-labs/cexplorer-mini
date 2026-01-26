import type { FC } from "react";

import { TableList } from "@/components/global/TableList";

import { useStakeList } from "@/hooks/useStakeList";

export const StakeTab: FC = () => {
  const { columns, items, loading, hasNextPage, fetchNextPage } =
    useStakeList();

  return (
    <TableList
      title='All Stake Accounts'
      withPadding={false}
      columns={columns}
      items={items}
      storeKey='stake_list'
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
      loading={loading}
    />
  );
};
