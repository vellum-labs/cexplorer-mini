import type { FC } from "react";
import type { AddressListTableColumns } from "@/types/tableTypes";

import { TableList } from "@/components/global/TableList";

import { addressListTableOptions } from "@/constants/tables/addressListTableOptions";

import { useAddressListTableStore } from "@/stores/tables/addressListTableStore";
import { useAddressList } from "@/hooks/useAddressList";

export const StakeTab: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useAddressListTableStore();

  const { columns, items } = useAddressList();

  return (
    <TableList
      title='All Stake Accounts'
      rows={rows}
      columns={columns.sort((a, b) => {
        return (
          columnsOrder.indexOf(a.key as keyof AddressListTableColumns) -
          columnsOrder.indexOf(b.key as keyof AddressListTableColumns)
        );
      })}
      columnsOptions={addressListTableOptions.map(item => {
        return {
          label: item.name,
          isVisible: columnsVisibility[item.key],
          onClick: () =>
            setColumnVisibility(item.key, !columnsVisibility[item.key]),
        };
      })}
      items={items}
      setColumsOrder={setColumsOrder}
      setRows={setRows}
    />
  );
};
