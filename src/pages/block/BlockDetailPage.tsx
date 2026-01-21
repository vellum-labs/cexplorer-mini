import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

import { getRouteApi } from "@tanstack/react-router";

import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { MintedByCard } from "@vellumlabs/cexplorer-sdk/MintedByCard";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { SizeCard } from "@vellumlabs/cexplorer-sdk/SizeCard";
import { TimeDateIndicator } from "@vellumlabs/cexplorer-sdk/TimeDateIndicator";
import { Tooltip } from "@vellumlabs/cexplorer-sdk/Tooltip";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  HardDrive,
} from "lucide-react";
import { TxListPage } from "../tx/TxListPage";
import { useFetchBlockDetail } from "@/services/block";
import { useFetchEpochParam } from "@/services/epoch";
import { normalizeHash } from "@/utils/normalizeHash";

export const BlockDetailPage: FC = () => {
  const route = getRouteApi("/block/$hash");
  const { hash } = route.useParams();

  const { data: blockDetailData } = useFetchBlockDetail(hash);
  const blockDetail = blockDetailData?.mini_block_detail?.[0];

  const { data: epochParamData } = useFetchEpochParam();
  const maxBlockSize =
    epochParamData?.epoch_param && Array.isArray(epochParamData?.epoch_param)
      ? epochParamData?.epoch_param[0].max_block_size
      : undefined;

  const overviewListItems = [
    {
      label: "Date",
      value: blockDetail?.block_time ? (
        <TimeDateIndicator time={blockDetail.block_time} />
      ) : (
        <span>-</span>
      ),
    },
    {
      label: "Height",
      value: (
        <div className='flex items-center gap-1'>
          <span className='text-text-sm font-medium text-text'>
            {blockDetail?.block_no ? formatNumber(blockDetail.block_no) : "-"}
          </span>
          {blockDetail?.block_no && (
            <Copy copyText={String(blockDetail.block_no)} />
          )}
          <div>
            <div className='flex items-center gap-1/2'>
              <Tooltip
                content={<p className='text-nowrap'>View previous block</p>}
              >
                <div
                  className={`border-border} flex h-5 w-5 cursor-pointer items-center justify-center rounded-[4px] border`}
                >
                  <ChevronLeft size={14} />
                </div>
              </Tooltip>
              <Tooltip content={<p className='text-nowrap'>View next block</p>}>
                <div
                  className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-[4px] border border-border`}
                >
                  <ChevronRight size={14} />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Epoch",
      value: blockDetail?.epoch_no ? (
        <div className='text-text-sm'>
          <EpochCell no={blockDetail.epoch_no} justify='start' />
        </div>
      ) : (
        <span>-</span>
      ),
    },
    {
      label: "Slot",
      value: (
        <div className='flex flex-wrap items-center gap-1/2 text-text-sm leading-none'>
          <span className='font-medium text-text'>
            {blockDetail?.slot_no ? formatNumber(blockDetail.slot_no) : "-"}
          </span>
          {blockDetail?.slot_no && (
            <Copy copyText={String(blockDetail.slot_no)} />
          )}
          <span className='pr-1/2 text-grayTextPrimary'>
            (epoch slot{" "}
            {blockDetail?.slot_no ? formatNumber(blockDetail.slot_no) : "-"})
          </span>
        </div>
      ),
    },
    {
      label: <span className='inline-block break-words'>Confirmations</span>,
      value: (
        <div className='flex items-center gap-[2.5px] text-text-sm'>
          <CircleCheck size={15} className='translate-y-[1px] text-green-600' />
          <span className={`font-bold text-green-500`}>High (49)</span>
        </div>
      ),
    },
  ];

  const overviewTransactionsListItems = [
    {
      label: <span className='text-nowrap'>Total Transactions</span>,
      value: (
        <span className='text-text-sm font-medium text-text'>
          {blockDetail?.tx_count ?? "-"}
        </span>
      ),
    },
  ];

  return (
    <PageBase
      metadataTitle='blockDetail'
      metadataReplace={{
        before: "%block%",
        after: hash,
      }}
      breadcrumbItems={[
        {
          label: (
            <span className='inline pt-1/2'>
              Epoch {blockDetail?.epoch_no ?? "-"}
            </span>
          ),
        },
        {
          label: <span className=''>{formatString(hash ?? "", "long")}</span>,
          ident: hash,
        },
      ]}
      title='Block Detail'
      subTitle={
        <HeaderBannerSubtitle
          hashString={formatString(hash ?? "", "long")}
          hash={hash}
        />
      }
      homepageAd
    >
      <section className='flex w-full justify-center'>
        <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 p-mobile md:p-desktop xl:flex-nowrap xl:justify-start'>
          <div className='flex grow basis-[980px] flex-wrap gap-3'>
            <OverviewCard
              title='Block Overview'
              overviewList={overviewListItems}
              className='h-auto min-h-[227px]'
            />
            <OverviewCard
              title='Transactions and Fees'
              overviewList={overviewTransactionsListItems}
              className='h-auto'
            />
          </div>
          <div className='flex w-[400px] flex-grow flex-col gap-3 xl:justify-between xl:gap-0'>
            {blockDetail?.slot_leader && (
              <MintedByCard
                poolInfo={{
                  id: normalizeHash(blockDetail.slot_leader.hash),
                  meta: {
                    name: blockDetail.slot_leader.description,
                    ticker: blockDetail.slot_leader.description,
                    homepage: "",
                    description: blockDetail.slot_leader.description,
                    extended: {},
                  },
                }}
                vrfKey={blockDetail.vrf_key ?? ""}
                protoMajor={blockDetail.proto_major ?? 0}
                protoMinor={blockDetail.proto_minor ?? 0}
                opCounter={blockDetail.op_cert_counter ?? 0}
                isGenesisBlock={blockDetail.epoch_no === null}
                miscData={undefined}
                generateImageUrl={() => ""}
              />
            )}
            <SizeCard
              size={blockDetail?.block_size ?? 0}
              maxSize={maxBlockSize ?? 5000000}
              title='Block size'
              icon={<HardDrive size={20} className='text-primary' />}
            />
          </div>
        </div>
      </section>
      <div className='w-full max-w-desktop px-mobile md:px-desktop'>
        <TxListPage
          tab
          txData={blockDetail?.tx_data}
          hideColumns={["date", "block"]}
          showLoadMore={false}
        />
      </div>
    </PageBase>
  );
};
