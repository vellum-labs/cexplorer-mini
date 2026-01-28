import type { FC } from "react";
import type { AddressData } from "@/services/address";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";

interface AddressDetailOverviewProps {
  data?: AddressData;
  address: string;
}

export const AddressDetailOverview: FC<AddressDetailOverviewProps> = ({
  data,
  address,
}) => {
  const assetCount = data?.asset?.length ?? 0;

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
      value: <AdaWithTooltip data={data?.balance ?? 0} />,
    },
    {
      label: "Assets",
      value: <span>{assetCount}</span>,
    },
  ];

  const delegationArr = [
    {
      label: "Status",
      value: <span className='font-bold text-redText'>Inactive</span>,
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
      value: <AdaWithTooltip data={0} />,
    },
    {
      label: "Rewards Available",
      value: <AdaWithTooltip data={0} />,
    },
    {
      label: "Rewards Withdrawn",
      value: <AdaWithTooltip data={0} />,
    },
  ];

  const detail = [
    {
      label: "Type",
      value: address.startsWith("addr") ? "Shelley" : "Byron",
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
  ];

  return (
    <>
      <OverviewCard title='Overview' overviewList={overviewList} className='' />
      <OverviewCard
        title='Delegation'
        overviewList={delegationArr}
        className=''
      />
      <OverviewCard title='Detail' overviewList={detail} className='' />
    </>
  );
};
