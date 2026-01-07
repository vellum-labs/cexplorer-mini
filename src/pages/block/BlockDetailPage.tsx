import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

import { getRouteApi } from "@tanstack/react-router";

import {
  AdaWithTooltip,
  Copy,
  EpochCell,
  formatNumber,
  formatString,
  HeaderBannerSubtitle,
  MintedByCard,
  OverviewCard,
  SizeCard,
  TimeDateIndicator,
  Tooltip,
} from "@vellumlabs/cexplorer-sdk";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  HardDrive,
} from "lucide-react";
import { TxListPage } from "../tx/TxListPage";

export const BlockDetailPage: FC = () => {
  const route = getRouteApi("/block/$hash");
  const { hash } = route.useParams();

  const overviewListItems = [
    {
      label: "Date",
      value: <TimeDateIndicator time='2026-01-07T19:22:19' />,
    },
    {
      label: "Height",
      value: (
        <div className='flex items-center gap-1'>
          <span className='text-text-sm font-medium text-text'>
            {formatNumber(5960121)}
          </span>
          <Copy copyText={String(5960121)} />
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
      value: (
        <div className='text-text-sm'>
          <EpochCell no={601} justify='start' />
        </div>
      ),
    },
    {
      label: "Slot",
      value: (
        <div className='flex flex-wrap items-center gap-1/2 text-text-sm leading-none'>
          <span className='font-medium text-text'>{formatNumber(128450)}</span>
          <Copy copyText={String(128450)} />
          <span className='pr-1/2 text-grayTextPrimary'>
            (epoch slot {formatNumber(128450)})
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
        <span className='text-text-sm font-medium text-text'>{45682}</span>
      ),
    },
    {
      label: "Total Output",
      value: <AdaWithTooltip data={789456132} />,
    },
    {
      label: "Total Fees",
      value: <AdaWithTooltip data={789456132} />,
    },
    {
      label: "Total Rewards",
      value: <AdaWithTooltip data={789456132} />,
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
          label: <span className='inline pt-1/2'>Epoch {596}</span>,
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
            <MintedByCard
              poolInfo={{
                id: "pool1c3fjkls7d2aujud8y5xy5e0azu0ueatwn34u7jy3ql85ze3xya8",
                meta: {
                  name: "Cardano Yoda Pool",
                  ticker: "MANDA",
                  homepage: "https://cardanoyoda.com",
                  description: "MANDA Pool is operated by Cardano Yoda",
                  extended: {},
                },
              }}
              vrfKey={
                "vrf_vk1ugya7fr6k6ra87377qfs0mwpcee8taq4sgzl9rhrn62xat4y6wcslrc7jp"
              }
              protoMajor={10}
              protoMinor={2}
              opCounter={16666666666666}
              isGenesisBlock={false}
              miscData={undefined}
              generateImageUrl={() => ""}
            />
            <SizeCard
              size={4500000}
              maxSize={5000000}
              title='Block size'
              icon={<HardDrive size={20} className='text-primary' />}
            />
          </div>
        </div>
      </section>
      <div className='w-full max-w-desktop px-mobile md:px-desktop'>
        <TxListPage tab />
      </div>
    </PageBase>
  );
};
