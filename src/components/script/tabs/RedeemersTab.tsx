import { useMemo, type FC } from "react";

import { TableList } from "@/components/global/TableList";
import { HashCell } from "@/components/tx/HashCell";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { BlockCell } from "@vellumlabs/cexplorer-sdk/BlockCell";
import { normalizeHash } from "@/utils/normalizeHash";
import { useFetchRedeemerList } from "@/services/script";

interface RedeemersTabProps {
  scriptHash: string;
}

const getPurposeColor = (purpose: string): "blue" | "green" | "yellow" | "red" => {
  switch (purpose) {
    case "mint":
      return "blue";
    case "spend":
      return "green";
    case "reward":
      return "yellow";
    case "cert":
      return "red";
    default:
      return "blue";
  }
};

export const RedeemersTab: FC<RedeemersTabProps> = ({ scriptHash }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchRedeemerList(
    scriptHash,
    20
  );

  const items = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.mini_redeemer_list ?? []);
  }, [data]);

  const columns = [
    {
      key: "date",
      render: item => <DateCell time={item.block_time} />,
      title: "Date",
      widthPx: 60,
    },
    {
      key: "tx_hash",
      render: item => <HashCell hash={item.tx_hash} />,
      title: "Transaction",
      widthPx: 80,
    },
    {
      key: "block",
      render: item => (
        <div className='flex justify-end'>
          <BlockCell hash={normalizeHash(item.block_hash)} no={item.block_height} />
        </div>
      ),
      title: <p className='w-full text-right'>Block</p>,
      widthPx: 40,
    },
    {
      key: "purpose",
      render: item => (
        <Badge color={getPurposeColor(item.purpose)}>{item.purpose}</Badge>
      ),
      title: "Purpose",
      widthPx: 40,
    },
    {
      key: "fee",
      render: item => (
        <span className='flex items-center justify-end'>
          <AdaWithTooltip data={item.fee ?? 0} />
        </span>
      ),
      title: <p className='w-full text-right'>Fee</p>,
      widthPx: 50,
    },
    {
      key: "unit_mem",
      render: item => (
        <p className='text-right'>{formatNumber(Number(item.unit_mem))}</p>
      ),
      title: <p className='w-full text-right'>Memory</p>,
      widthPx: 50,
    },
    {
      key: "unit_steps",
      render: item => (
        <p className='text-right'>{formatNumber(Number(item.unit_steps))}</p>
      ),
      title: <p className='w-full text-right'>Steps</p>,
      widthPx: 60,
    },
  ];

  return (
    <TableList
      columns={columns}
      items={items}
      storeKey='script_redeemers'
      loading={isLoading}
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage}
    />
  );
};
