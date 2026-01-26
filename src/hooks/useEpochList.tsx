import type { Column } from "@/components/global/TableList";
import type { EpochData, EpochListData } from "@/services/epoch";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { convertUtcToLocal } from "@vellumlabs/cexplorer-sdk/Format";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { lovelaceToAda } from "@vellumlabs/cexplorer-sdk/LovelaceToAda";

import { useFetchEpochList } from "@/services/epoch";
import { format } from "date-fns";

interface UseEpochListReturn {
  items: EpochData[] | undefined;
  columns: Column<Record<string, unknown>>[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<EpochListData, unknown>, Error>
  >;
  hasNextPage: boolean;
  loading: boolean;
}

export const useEpochList = (): UseEpochListReturn => {
  const {
    data: epochData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchEpochList(20);

  const items = epochData?.pages.flatMap(page => page.epoch);

  const columns = [
    {
      key: "epoch",
      render: item => {
        const epochNo = item.no;
        return (
          <EpochCell
            no={epochNo}
            showPulseDot
            currentEpoch={600}
            justify='start'
          />
        );
      },
      title: <p>Epoch</p>,
      widthPx: 50,
    },
    {
      key: "start_time",
      render: item => {
        const localDate = convertUtcToLocal(item?.start_time);
        const dateFromDataTime = new Date(localDate.replace(" ", "T"));

        return (
          <div className='flex flex-col'>
            <span> {format(dateFromDataTime, "dd.MM.yyyy")}</span>
            <DateCell
              time={item?.start_time}
              className='text-text-xs text-grayTextPrimary'
            />
          </div>
        );
      },
      title: "Start Time",
      widthPx: 90,
    },
    {
      key: "end_time",
      render: item => {
        const localDate = convertUtcToLocal(item?.end_time);
        const dateFromDataTime = new Date(localDate.replace(" ", "T"));

        return (
          <div className='flex flex-col'>
            <span> {format(dateFromDataTime, "dd.MM.yyyy")}</span>
            <DateCell
              time={item?.end_time}
              className='text-text-xs text-grayTextPrimary'
            />
          </div>
        );
      },
      title: "End Time",
      widthPx: 90,
    },
    {
      key: "block",
      render: item => (
        <p title={item?.blk_count} className='text-right'>
          {formatNumber(item?.blk_count)}
        </p>
      ),
      title: <p className='w-full text-right'>Blocks</p>,
      widthPx: 50,
    },
    {
      key: "txs",
      render: item => (
        <p title={item?.tx_count} className='text-right'>
          {formatNumber(item?.tx_count)}
        </p>
      ),
      title: <p className='w-full text-right'>TXs</p>,
      widthPx: 50,
    },
    {
      key: "outsum",
      render: item => (
        <p title={item?.out_sum} className='text-right'>
          <AdaWithTooltip data={item?.out_sum} />
        </p>
      ),
      title: <p className='w-full text-right'>Output</p>,
      widthPx: 55,
    },
    {
      key: "fees",
      render: item => {
        const feesperTx = lovelaceToAda(
          isNaN(item?.fees / item.tx_count) ? 0 : item?.fees / item.tx_count,
        );

        return (
          <div title={item?.fees} className='flex flex-col'>
            <span>
              <AdaWithTooltip data={item?.fees ?? 0} />
            </span>
            <span>{feesperTx}/tx</span>
          </div>
        );
      },
      title: "Fees",
      widthPx: 50,
    },
  ];

  return {
    items,
    loading: isLoading,
    columns: columns.map(item => ({ ...item, visible: true })),
    fetchNextPage,
    hasNextPage,
  };
};
