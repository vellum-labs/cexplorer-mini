import type { TxListTableColumns } from "@/types/tableTypes";
import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useTxListTableStore } from "@/stores/tables/txListTableStore";

import { txListTableOptions } from "@/constants/tables/txListTableOptions";
import { useTxList } from "@/hooks/useTxList";

interface TxListPageProps {
  tab?: boolean;
}

export const TxListPage: FC<TxListPageProps> = ({ tab = false }) => {
  const {
    columnsVisibility,
    rows,
    columnsOrder,
    setColumnVisibility,
    setRows,
    setColumsOrder,
  } = useTxListTableStore();

  const { columns, items } = useTxList();

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
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof TxListTableColumns) -
            columnsOrder.indexOf(b.key as keyof TxListTableColumns)
          );
        })}
        columnsOptions={txListTableOptions.map(item => {
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
    </PageBase>
  );
};
