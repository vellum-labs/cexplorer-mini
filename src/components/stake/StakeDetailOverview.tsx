import { type FC } from "react";
import type { StakeAddressData } from "@/services/address";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";

interface StakeDetailOverviewProps {
  data?: StakeAddressData;
  stakeAddress: string;
}

export const StakeDetailOverview: FC<StakeDetailOverviewProps> = ({
  data,
  stakeAddress,
}) => {
  const address = data?.stake_view || stakeAddress;

  const getStatusBadge = () => {
    const status = data?.status;
    if (status === "registered") {
      return <Badge color='green'>Registered</Badge>;
    }
    if (status === "deregistered") {
      return <Badge color='red'>Deregistered</Badge>;
    }
    return <Badge color='yellow'>Unknown</Badge>;
  };

  const overviewList = [
    {
      label: "Total balance",
      value: <AdaWithTooltip data={Number(data?.total_balance ?? 0)} />,
    },
    {
      label: "UTXO balance",
      value: <AdaWithTooltip data={Number(data?.utxo ?? 0)} />,
    },
    {
      label: "Private name",
      value: "-",
    },
  ];

  const stakeKey = [
    {
      label: "Status",
      value: getStatusBadge(),
    },
    {
      label: "Stake pool",
      value: data?.delegated_pool ? (
        <span className='flex items-center gap-1'>
          <span>{formatString(data.delegated_pool, "long")}</span>
          <Copy copyText={data.delegated_pool} />
        </span>
      ) : (
        "Not delegated"
      ),
    },
    {
      label: "Rewards available",
      value: <AdaWithTooltip data={Number(data?.rewards_available ?? 0)} />,
    },
    {
      label: "DRep delegation",
      value: data?.delegated_drep ? (
        <span className='flex items-center gap-1'>
          <span>{formatString(data.delegated_drep, "long")}</span>
          <Copy copyText={data.delegated_drep} />
        </span>
      ) : (
        "-"
      ),
    },
    {
      label: "Rewards withdrawn",
      value: <AdaWithTooltip data={Number(data?.withdrawals ?? 0)} />,
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
