import type { FC, MouseEventHandler, ReactNode, RefObject } from "react";

import {
  GlobalTable,
  TableSearchInput,
  TableSettingsDropdown,
} from "@vellumlabs/cexplorer-sdk";

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
  title: string;
  rows: number;
  setRows: (rows: number) => void;
  columnsOptions: {
    label: ReactNode;
    isVisible: boolean;
    onClick?: () => void;
  }[];
  items: Record<string, unknown>[] | undefined;
  columns: Column<Record<string, unknown>>[];
  setColumsOrder: ((columns: any[]) => void) | undefined;
}

export const TableList: FC<TableListProps> = ({
  title,
  rows,
  columnsOptions,
  items,
  columns,
  setColumsOrder,
  setRows,
}) => {
  return (
    <section
      className={`flex w-full max-w-desktop flex-col py-3 ${!title ? "" : "px-mobile md:px-desktop"}`}
    >
      <div className='mb-2 flex w-full flex-col justify-between gap-1 md:flex-row md:items-center'>
        <div className='flex w-full flex-wrap items-center justify-between gap-1 sm:flex-nowrap'>
          <span className='font-semibold'>{title}</span>
          <div className='flex justify-end max-[435px]:w-full md:hidden'>
            <div className='flex items-center gap-1 md:hidden'>
              <TableSettingsDropdown
                rows={rows}
                setRows={setRows}
                columnsOptions={columnsOptions}
              />
            </div>
          </div>
        </div>

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
      </div>
      <GlobalTable
        type='infinite'
        currentPage={1}
        totalItems={20}
        itemsPerPage={rows}
        minContentWidth={1200}
        scrollable
        query={
          {
            isLoading: false,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
        items={items}
        columns={columns}
        onOrderChange={setColumsOrder}
      />
    </section>
  );
};
