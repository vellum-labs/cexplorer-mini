import type { Column } from "@/components/global/TableList";
import type { AddressData, AddressListData } from "@/services/address";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

import { useFetchAddressList } from "@/services/address";

interface UseAddressListReturn {
  items: AddressData[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<AddressListData, unknown>, Error>
  >;
  hasNextPage: boolean;
  loading: boolean;
  fetching: boolean;
}

export const useAddressList = (): UseAddressListReturn => {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useFetchAddressList(20);

  const items = data?.pages.flatMap(page => page.mini_get_address);

  const columns = [
    {
      key: "address",
      render: item => {
        if (!item?.address) {
          return "-";
        }

        return (
          <Link
            to='/address/$address'
            params={{ address: item.address }}
            className='text-primary'
          >
            <span title={item.address as string}>
              {formatString(item.address, "long")}
            </span>
          </Link>
        );
      },
      title: <p>Address</p>,
      widthPx: 120,
    },
    {
      key: "balance",
      render: item => {
        if (item?.balance === null || item?.balance === undefined) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            <AdaWithTooltip data={item.balance} />
          </p>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Balance</span>
        </div>
      ),
      widthPx: 80,
    },
  ];

  return {
    items,
    loading: isLoading,
    fetching: isFetching,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
