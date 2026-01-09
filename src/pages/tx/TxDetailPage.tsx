import {
  Badge,
  formatString,
  HeaderBannerSubtitle,
  Tabs,
} from "@vellumlabs/cexplorer-sdk";
import CollateralTabItem from "@/components/tx/tabs/CollateralTabItem";
import ContentTabItem from "@/components/tx/tabs/ContentTabItem";
import { ContractsTabItem } from "@/components/tx/tabs/ContractsTabItem";
import MetadataTabItem from "@/components/tx/tabs/MetadataTabItem";
import OverviewTabItem from "@/components/tx/tabs/OverviewTabItem";
import ReferenceInputsTabItem from "@/components/tx/tabs/ReferenceInputsTabItem";
import WithdrawalsTabItem from "@/components/tx/tabs/WithdrawalsTabItem";
import TxDetailOverview from "@/components/tx/TxDetailOverview";
import { PageBase } from "@/components/global/PageBase";

export const TxDetailPage = () => {
  const hash = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6";

  // TODO: Fix tabs UI
  const txTabItems = [
    {
      key: "overview",
      label: "Overview",
      content: <OverviewTabItem />,
      visible: true,
    },
    {
      key: "content",
      label: "Content",
      content: <ContentTabItem />,
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
      title: "Contracts",
      content: <ContractsTabItem />,
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
      title: "Collateral",
      content: <CollateralTabItem />,
      visible: true,
    },
    {
      key: "withdrawals",
      label: (
        <span className='flex items-center gap-1'>
          Withdrawals
          <Badge small color='gray'>
            2
          </Badge>
        </span>
      ),
      title: "Withdrawals",
      content: <WithdrawalsTabItem />,
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
      title: "Reference inputs",
      content: <ReferenceInputsTabItem />,
      visible: true,
    },
    {
      key: "metadata",
      label: "Metadata",
      content: <MetadataTabItem />,
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
