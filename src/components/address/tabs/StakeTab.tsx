import type { FC } from "react";

import { TableList } from "@/components/global/TableList";

import { useAddressList } from "@/hooks/useAddressList";

export const StakeTab: FC = () => {
  const { columns, items } = useAddressList();

  return (
    <TableList
      title='All Stake Accounts'
      columns={columns}
      items={items}
      storeKey='stake_list'
    />
  );
};
