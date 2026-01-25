import type { FC } from "react";
import type { TxDetailData } from "@/services/tx";

import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { BlockCell } from "@vellumlabs/cexplorer-sdk/BlockCell";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { SizeCard } from "@vellumlabs/cexplorer-sdk/SizeCard";
import { CircleCheck, Lock, FileCode } from "lucide-react";

interface TxDetailOverviewProps {
  txDetail: TxDetailData | undefined;
  isLoading?: boolean;
}

export const TxDetailOverview: FC<TxDetailOverviewProps> = ({
  txDetail,
  isLoading,
}) => {
  const hash = txDetail?.tx_hash ?? "";
  const timestamp = txDetail?.tx_timestamp
    ? new Date(txDetail.tx_timestamp * 1000)
    : undefined;
  const blockHeight = txDetail?.block_height ?? 0;
  const blockHash = txDetail?.block_hash ?? "";
  const totalOutput = txDetail?.total_output
    ? Number(txDetail.total_output)
    : 0;
  const fee = txDetail?.fee ? Number(txDetail.fee) : 0;
  const epochNo = txDetail?.epoch_no ?? 0;
  const absoluteSlot = txDetail?.absolute_slot ?? 0;
  const epochSlot = txDetail?.epoch_slot ?? 0;
  const deposit = txDetail?.deposit ? Number(txDetail.deposit) : null;
  const txSize = txDetail?.tx_size ?? 0;

  const maxTxSize = 16384;

  const overviewListItems = [
    {
      label: "Hash",
      value: isLoading ? (
        <div className='rounded h-5 w-40 animate-pulse bg-border' />
      ) : (
        <div className='flex items-center gap-1/2'>
          <span title={hash} className='text-text-sm'>
            {formatString(hash || "", "long")}
          </span>
          <Copy copyText={hash || ""} />
        </div>
      ),
    },
    {
      label: "Date",
      value: isLoading ? (
        <div className='rounded h-5 w-32 animate-pulse bg-border' />
      ) : (
        <div className='flex flex-wrap items-center gap-1/2 text-text-sm'>
          <span className='font-medium leading-none'>
            <DateCell time={timestamp as unknown as string} />
          </span>
        </div>
      ),
    },
    {
      label: "Height",
      value: isLoading ? (
        <div className='rounded h-5 w-24 animate-pulse bg-border' />
      ) : (
        <div className='text-text-sm'>
          <BlockCell hash={blockHash} no={blockHeight} justify='start' />
        </div>
      ),
    },
    {
      label: "Total Output",
      value: isLoading ? (
        <div className='rounded h-5 w-20 animate-pulse bg-border' />
      ) : (
        <AdaWithTooltip data={totalOutput} />
      ),
    },
    {
      label: "Fee",
      value: isLoading ? (
        <div className='rounded h-5 w-20 animate-pulse bg-border' />
      ) : (
        <AdaWithTooltip data={fee} />
      ),
    },
    {
      label: "Epoch",
      value: isLoading ? (
        <div className='rounded h-5 w-16 animate-pulse bg-border' />
      ) : (
        <div className='text-text-sm'>
          <EpochCell no={epochNo} justify='start' />
        </div>
      ),
    },
    {
      label: "Slot",
      value: isLoading ? (
        <div className='rounded h-5 w-48 animate-pulse bg-border' />
      ) : (
        <div className='flex flex-wrap items-center gap-1/2 text-text-sm leading-none'>
          <span className='font-medium text-grayTextPrimary'>
            {formatNumber(absoluteSlot)}
          </span>
          <span className='pr-1/2 text-grayTextPrimary'>
            (epoch slot {formatNumber(epochSlot)})
          </span>
        </div>
      ),
    },
    {
      label: "TTL",
      value: isLoading ? (
        <div className='rounded h-5 w-32 animate-pulse bg-border' />
      ) : (
        <div className='flex items-center gap-1/2 text-text-sm'>
          <Lock
            size={16}
            strokeWidth={2.5}
            className='shrink-0 text-grayTextPrimary'
          />
          <span className='font-medium text-grayTextPrimary'>No expiry</span>
        </div>
      ),
    },
    ...(deposit !== null && deposit !== 0
      ? [
          {
            label: "Deposit",
            value: isLoading ? (
              <div className='rounded h-5 w-20 animate-pulse bg-border' />
            ) : (
              <div className='flex items-center gap-1/2 text-text-sm'>
                <span className='font-medium'>
                  <AdaWithTooltip data={deposit} />
                </span>
              </div>
            ),
          },
        ]
      : []),
    {
      label: "Confirmations",
      value: isLoading ? (
        <div className='rounded h-5 w-24 animate-pulse bg-border' />
      ) : (
        <div className='flex items-center gap-[2.5px] text-text-sm'>
          <CircleCheck size={15} className='translate-y-[1px] text-green-600' />
          <span className='font-bold text-green-500'>High</span>
        </div>
      ),
    },
  ];

  return (
    <div className='flex h-full w-full max-w-desktop flex-col gap-3 px-mobile lg:flex-row lg:px-desktop'>
      <OverviewCard
        title='Transaction Overview'
        overviewList={overviewListItems}
        className='max-h-[450px] pt-2'
        columnGap='clamp(48px, 8vw, 150px)'
      />
      <section className='flex w-full flex-col gap-5 lg:h-[400px] lg:w-[400px]'>
        <SizeCard
          size={txSize}
          maxSize={maxTxSize}
          title='Transaction size'
          icon={<FileCode size={20} className='text-primary' />}
        />
      </section>
    </div>
  );
};
