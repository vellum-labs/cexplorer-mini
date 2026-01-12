import { type FC } from "react";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk";
import { formatString } from "@vellumlabs/cexplorer-sdk";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk";
import { Badge } from "@vellumlabs/cexplorer-sdk";
import { Copy } from "@vellumlabs/cexplorer-sdk";

interface StakeDetailOverviewProps {
  data: any;
  stakeAddress: string;
}

export const StakeDetailOverview: FC<StakeDetailOverviewProps> = ({
  data,
  stakeAddress,
}) => {
  const address = data?.view || stakeAddress;

  const overviewList = [
    {
      label: "Total balance",
      value: <AdaWithTooltip data={data?.stake?.live?.amount ?? 0} />,
    },
    {
      label: "ADA balance",
      value: <AdaWithTooltip data={data?.stake?.active?.amount ?? 0} />,
    },
    {
      label: "Private name",
      value: "-",
    },
  ];

  const stakeKey = [
    {
      label: "Status",
      value: (
        <>
          {data?.stake?.info?.active ? (
            <Badge className='' color='green'>
              Active
            </Badge>
          ) : data?.stake?.info?.active === null ? (
            <Badge className='' color='red'>
              Inactive
            </Badge>
          ) : (
            <Badge className='' color='yellow'>
              Deregistered
            </Badge>
          )}
        </>
      ),
    },
    {
      label: "Stake pool",
      value: "-",
    },
    {
      label: "Rewards available",
      value: (
        <AdaWithTooltip
          data={(data?.reward?.total ?? 0) - (data?.reward?.withdrawn ?? 0)}
        />
      ),
    },
    {
      label: "DRep delegation",
      value: "-",
    },
    {
      label: "Rewards withdrawn",
      value: <AdaWithTooltip data={data?.reward?.withdrawn ?? 0} />,
    },
    {
      label: "Stake key",
      value: (
        <p className='flex items-center gap-[6px]' title={address}>
          <span>{formatString(address, "longer")}</span>
          <Copy copyText={address} className='translate-y-[2px]' />
        </p>
      ),
    },
  ];

  return (
    <>
      <OverviewCard
        title='Overview'
        overviewList={overviewList}
        className='min-h-[320px]'
      />
      <OverviewCard
        title='Staking'
        overviewList={stakeKey}
        className='min-h-[320px]'
      />
    </>
  );
};
