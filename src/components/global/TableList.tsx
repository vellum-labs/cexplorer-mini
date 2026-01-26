import type { FC, MouseEventHandler, ReactNode, RefObject } from "react";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { getNodeText } from "@vellumlabs/cexplorer-sdk/GetNodeText";
import { GlobalTable } from "@vellumlabs/cexplorer-sdk/GlobalTable";
import { TableSearchInput } from "@vellumlabs/cexplorer-sdk/TableSearchInput";
import { TableSettingsDropdown } from "@vellumlabs/cexplorer-sdk/TableSettingsDropdown";
import { Button } from "@vellumlabs/cexplorer-sdk/Button";

import { useTableStore } from "@/stores/tableStore";
import { Download } from "lucide-react";

export type Column<T> = {
  key: string;
  title: ReactNode;
  standByRanking?: boolean;
  render: (item: T) => ReactNode | null;
  extraContent?: ReactNode;
  widthPx?: number;
  visible?: boolean;
  rankingStart?: "asc" | "desc";
  className?: string;
  helper?: ReactNode;
  filter?: {
    filterOpen?: boolean;
    activeFunnel?: boolean;
    filterContent?: ReactNode;
    filterButtonDisabled?: boolean;
    anchorRef: RefObject<unknown>;
    width?: string;
    onShow?: MouseEventHandler<SVGSVGElement>;
    onReset?: () => void;
    onFilter?: () => void;
  };
};

interface TableListProps {
  title?: string;
  items: any[] | undefined;
  columns: Omit<Column<Record<string, unknown>>, "visible">[];
  storeKey?: string;
  withPadding?: boolean;
  showMoreButton?: boolean;
  loading?: boolean;
  onFetch?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
}

export const TableList: FC<TableListProps> = ({
  title,
  items,
  columns,
  storeKey,
  withPadding = true,
  loading = true,
  showMoreButton = true,
  onFetch,
}) => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useTableStore(columns, storeKey)();

  const columnsOptions = columns.map(item => ({
    label: getNodeText(item.title),
    isVisible: columnsVisibility[item.key],
    onClick: () => setColumnVisibility(item.key, !columnsVisibility[item.key]),
  }));

  const filteredColumns = columns.map(item => ({
    ...item,
    visible: columnsVisibility[item.key],
  }));

  return (
    <section
      className={`flex w-full max-w-desktop flex-col py-3 ${!title && !withPadding ? "" : "px-mobile md:px-desktop"}`}
    >
      <div className='mb-2 flex w-full flex-col justify-between gap-1 md:flex-row md:items-center'>
        <div className='flex w-full flex-wrap items-center justify-between gap-1 sm:flex-nowrap'>
          <span className='font-semibold'>{title}</span>
          {storeKey && (
            <div className='flex justify-end max-[435px]:w-full md:hidden'>
              <div className='flex items-center gap-1 md:hidden'>
                <TableSettingsDropdown
                  rows={rows}
                  setRows={setRows}
                  columnsOptions={columnsOptions}
                />
              </div>
            </div>
          )}
        </div>

        {storeKey && (
          <div className='flex gap-1'>
            <TableSearchInput
              placeholder='Search by tx hash...'
              value=''
              onchange={val => console.log(val)}
              wrapperClassName='md:w-[320px] w-full'
              showSearchIcon
              showPrefixPopup={false}
            />
            <div className='hidden items-center gap-1 md:flex'>
              <TableSettingsDropdown
                rows={rows}
                setRows={setRows}
                columnsOptions={columnsOptions}
              />
            </div>
          </div>
        )}
      </div>
      <GlobalTable
        type='default'
        totalItems={20}
        itemsPerPage={rows}
        minContentWidth={1200}
        scrollable
        query={
          {
            isLoading: loading,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
        items={items}
        columns={filteredColumns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as string) -
            columnsOrder.indexOf(b.key as string)
          );
        })}
        onOrderChange={setColumsOrder}
      />
      {showMoreButton && (
        <div className='mt-1 flex w-full justify-center'>
          <Button
            size='md'
            variant='primary'
            label='Load more'
            leftIcon={<Download size={15} />}
            onClick={onFetch}
          />
        </div>
      )}
    </section>
  );
};
