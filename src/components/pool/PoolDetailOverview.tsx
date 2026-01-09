import type { FC } from "react";

import {
  AdaWithTooltip,
  Copy,
  formatNumber,
  formatString,
  OverviewCard,
} from "@vellumlabs/cexplorer-sdk";

interface PoolDetailOverview {
  hash: string;
}

export const PoolDetailOverview: FC<PoolDetailOverview> = ({ hash }) => {
  const aboutList = [
    { label: "Name", value: "AzureADA2" },
    { label: "Ticker", value: "[AZUR2]" },
    {
      label: "Pool ID",
      value: (
        <span className='flex items-center gap-1'>
          {formatString(hash || "", "long")}
          <Copy copyText={hash} />
        </span>
      ),
    },
    {
      label: "Created",
      value: "04.12.2020",
    },
    {
      label: "Delegators",
      value: "2,707",
    },
    {
      label: "Website",
      value: "azureada.com",
    },
  ];

  const stakeAndPledgeList = [
    {
      label: "Saturation",
      value: "TBD",
    },
    {
      label: "Live Stake",
      value: <AdaWithTooltip data={22_000_000} />,
    },
    {
      label: "Active Stake",
      value: <AdaWithTooltip data={22_000_000} />,
    },
    {
      label: "Declared Pledge",
      value: <AdaWithTooltip data={22_000_000} />,
    },
    {
      label: "Active Pledge",
      value: <AdaWithTooltip data={22_000_000} />,
    },
    { label: "Pledge Leverage", value: 44 },
    {
      label: "Margin Fee",
      value: (2).toFixed(2) + "%",
    },
    {
      label: "Fixed Fee",
      value: <AdaWithTooltip data={340000} />,
    },
  ];

  const performanceList = [
    {
      label: "Recent ROA",
      value: (
        <div className='flex items-center gap-1/2'>
          <span>{(2).toFixed(2) + "%"}</span>
        </div>
      ),
    },
    {
      label: "Lifetime ROA",
      value: "2%",
    },
    {
      label: "Blocks in Epoch",
      value: formatNumber(22),
    },
    {
      label: "Estimated Blocks",
      value: "22.24",
    },
    {
      label: "Prorated Luck",
      value: "125.89%",
    },
    {
      label: "Blocks Lifetime",
      value: formatNumber(8914),
    },
    {
      label: "Lifetime Luck",
      value: "96.51" + "%",
    },
  ];

  return (
    <div className='flex w-full flex-wrap items-stretch gap-3'>
      <OverviewCard title='About' overviewList={aboutList} />
      <OverviewCard
        title='Stake and Pledge'
        overviewList={stakeAndPledgeList}
      />
      <OverviewCard title='Performance' overviewList={performanceList} />
    </div>
  );
};
