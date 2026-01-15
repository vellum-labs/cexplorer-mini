import {
  Badge,
  formatString,
  HeaderBannerSubtitle,
  Tabs,
} from "@vellumlabs/cexplorer-sdk";
import TxDetailOverview from "@/components/tx/TxDetailOverview";
import { PageBase } from "@/components/global/PageBase";
import { WithdrawalsTab } from "@/components/address/tabs/WithdrawalsTab";
import { ReferenceInputsTab } from "./tabs/ReferenceInputsTab";
import { CollateralTab } from "./tabs/CollateralTab";

export const TxDetailPage = () => {
  const hash = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6";

  // TODO: Fix tabs UI
  const txTabItems = [
    {
      key: "overview",
      label: "Overview",
      content: <></>,
      visible: true,
    },
    {
      key: "content",
      label: "Content",
      content: <></>,
      visible: true,
    },
    {
      key: "contracts",
      label: (
        <span className='flex items-center gap-1'>
          Contracts{" "}
          <Badge small color='gray'>
            2
          </Badge>
        </span>
      ),
      content: <></>,
      visible: true,
    },
    {
      key: "collateral",
      label: (
        <span className='flex items-center gap-1'>
          Collateral
          <Badge small color='gray'>
            2
          </Badge>
        </span>
      ),
      content: <CollateralTab />,
      visible: true,
    },
    {
      key: "withdrawals",
      label: "Withdrawals",
      content: <WithdrawalsTab />,
      visible: true,
    },
    {
      key: "inputs",
      label: (
        <span className='flex items-center gap-1'>
          Reference inputs
          <Badge small color='gray'>
            2
          </Badge>
        </span>
      ),
      content: <ReferenceInputsTab />,
      visible: true,
    },
    {
      key: "metadata",
      label: "Metadata",
      content: <></>,
      visible: true,
    },
  ];

  return (
    <PageBase
      metadataTitle='transactionDetail'
      metadataReplace={{
        before: "%tx%",
        after: hash,
      }}
      breadcrumbItems={[
        {
          label: <span className='inline pt-1/2'>Epoch (456)</span>,
        },
        {
          label: <span className='inline pt-1/2'>Block (10234567)</span>,
        },
        {
          label: <span className=''>{formatString(hash, "long")}</span>,
          ident: hash,
        },
      ]}
      title='Transaction detail'
      subTitle={
        <HeaderBannerSubtitle
          hashString={formatString(hash ?? "", "long")}
          hash={hash}
        />
      }
    >
      <TxDetailOverview />
      <Tabs items={txTabItems} mobileItemsCount={3} />
    </PageBase>
  );
};
