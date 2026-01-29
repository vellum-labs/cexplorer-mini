import type { FC } from "react";

import { TableList } from "@/components/global/TableList";

import { useAddressList } from "@/hooks/useAddressList";

export const AddressesTab: FC = () => {
  const { columns, items, loading, fetching, hasNextPage, fetchNextPage } =
    useAddressList();

  return (
    <TableList
      title='All Addresses'
      withPadding={false}
      columns={columns}
      items={items}
      storeKey='address_list'
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
      loading={loading}
      fetching={fetching}
    />
  );
};
