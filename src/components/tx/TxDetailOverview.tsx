import type { FC } from "react";

import {
  AdaWithTooltip,
  BlockCell,
  Copy,
  DateCell,
  EpochCell,
  formatNumber,
  formatString,
  MintedByCard,
  OverviewCard,
  SizeCard,
} from "@vellumlabs/cexplorer-sdk";
import { CircleCheck, HardDrive, Lock } from "lucide-react";

const TxDetailOverview: FC = () => {
  const hash = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6";

  const overviewListItems = [
    {
      label: "Hash",
      value: (
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
      value: (
        <div className='flex flex-wrap items-center gap-1/2 text-text-sm'>
          <span className='font-medium leading-none'>
            <DateCell time='2026-01-04T21:44:52' />
          </span>
        </div>
      ),
    },
    {
      label: "Height",
      value: (
        <div className='text-text-sm'>
          <BlockCell hash={String(hash) || ""} no={4561231} justify='start' />
        </div>
      ),
    },
    {
      label: "Total Output",
      value: <AdaWithTooltip data={4654132132} />,
    },
    {
      label: "Fee",
      value: <AdaWithTooltip data={4654132132} />,
    },
    {
      label: "Epoch",
      value: (
        <div className='text-text-sm'>
          <EpochCell no={691} justify='start' />
        </div>
      ),
    },
    {
      label: "Slot",
      value: (
        <div className='flex flex-wrap items-center gap-1/2 text-text-sm leading-none'>
          <span className='font-medium text-grayTextPrimary'>
            {formatNumber(465132132)}
          </span>
          <span className='pr-1/2 text-grayTextPrimary'>
            (epoch slot {13130316})
          </span>
        </div>
      ),
    },
    {
      label: "TTL",
      value: (
        <div className='flex items-center gap-1/2 text-text-sm'>
          <Lock
            size={16}
            strokeWidth={2.5}
            className='shrink-0 text-grayTextPrimary'
          />
          <span className='font-medium text-grayTextPrimary'>TODO</span>
        </div>
      ),
    },
    {
      label: "Deposit",
      value: (
        <div className='flex items-center gap-1/2 text-text-sm'>
          <span className='font-medium'>
            <AdaWithTooltip data={4564321321} />
          </span>
        </div>
      ),
    },
    {
      label: "Confirmations",
      value: (
        <div className='flex items-center gap-[2.5px] text-text-sm'>
          <CircleCheck size={15} className='translate-y-[1px] text-green-600' />

          <span className={`font-bold text-green-500`}>High (49)</span>
        </div>
      ),
    },
    {
      label: "Treasury donation",
      value: <AdaWithTooltip data={13265323} />,
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
      </section>
    </div>
  );
};

export default TxDetailOverview;
