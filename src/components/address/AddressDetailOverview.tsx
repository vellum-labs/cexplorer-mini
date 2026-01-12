import type { FC } from "react";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk";
import { formatString } from "@vellumlabs/cexplorer-sdk";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk";
import { Copy } from "@vellumlabs/cexplorer-sdk";
import { DateCell } from "@vellumlabs/cexplorer-sdk";

interface AddressDetailOverviewProps {
  data: any[];
  address: string;
}

export const AddressDetailOverview: FC<AddressDetailOverviewProps> = ({
  data,
  address,
}) => {
  const overviewList = [
    {
      label: "Address",
      value: (
        <p className='flex items-center gap-[6px]' title={address}>
          <span>{formatString(address, "long")}</span>
          <Copy copyText={address} className='translate-y-[2px]' />
        </p>
      ),
    },
    {
      label: "ADA Balance",
      value: <AdaWithTooltip data={data?.[0]?.balance ?? 0} />,
    },
    {
      label: "Live Stake",
      value: <AdaWithTooltip data={data?.[0]?.stake?.balance?.live ?? 0} />,
    },
    {
      label: "Active Stake",
      value: <AdaWithTooltip data={data?.[0]?.stake?.balance?.active ?? 0} />,
    },
    {
      label: "Last Activity",
      value: <DateCell time={data?.[0]?.activity?.recent} />,
    },
    {
      label: "Private name",
      value: "-",
    },
  ];

  const delegationArr = [
    {
      label: "Status",
      value: (
        <span className='font-bold text-redText'>
          Inactive
        </span>
      ),
    },
    {
      label: "Stake pool",
      value: "Not delegated",
    },
    {
      label: "DRep delegation",
      value: "-",
    },
    {
      label: "Controlled Stake",
      value: <AdaWithTooltip data={data[0]?.stake?.balance.live ?? 0} />,
    },
    {
      label: "Rewards Available",
      value: (
        <AdaWithTooltip
          data={
            (data[0]?.stake?.reward.total ?? 0) -
            (data[0]?.stake?.reward.withdrawn ?? 0)
          }
        />
      ),
    },
    {
      label: "Rewards Withdrawn",
      value: <AdaWithTooltip data={data[0]?.stake?.reward.withdrawn ?? 0} />,
    },
  ];

  const detail = [
    {
      label: "Type",
      value: "-",
    },
    {
      label: "Address",
      value: (
        <p className='flex items-center gap-[6px]' title={address}>
          <span>{formatString(address, "long")}</span>
          <Copy copyText={address} className='translate-y-[2px]' />
        </p>
      ),
    },
    {
      label: "Payment Credential",
      value: "-",
    },
    {
      label: "Staking Credential",
      value: "-",
    },
    {
      label: "Last Activity",
      value: <DateCell time={data[0]?.activity?.recent ?? ""} />,
    },
    {
      label: "First Discovery",
      value: <DateCell time={data[0]?.activity?.first ?? ""} />,
    },
  ];

  return (
    <>
      <OverviewCard
        title='Overview'
        overviewList={overviewList}
        className=''
      />
      <OverviewCard
        title='Delegation'
        overviewList={delegationArr}
        className=''
      />
      <OverviewCard title='Detail' overviewList={detail} className='' />
    </>
  );
};
