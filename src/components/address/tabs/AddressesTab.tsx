import type { FC } from "react";

import { TableList } from "@/components/global/TableList";

import { useAddressList } from "@/hooks/useAddressList";

export const AddressesTab: FC = () => {
  const { columns, items } = useAddressList();

  return (
    <TableList
      title='All Addresses'
      columns={columns}
      items={items}
      storeKey='address_list'
    />
  );
};
