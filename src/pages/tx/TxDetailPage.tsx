import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import TxDetailOverview from "@/components/tx/TxDetailOverview";
import { PageBase } from "@/components/global/PageBase";
import { WithdrawalsTab } from "@/components/address/tabs/WithdrawalsTab";
import { ReferenceInputsTab } from "./tabs/ReferenceInputsTab";
import { CollateralTab } from "./tabs/CollateralTab";
import { OverviewTab } from "./tabs/OverviewTab";
import { getRouteApi } from "@tanstack/react-router";
import { useFetchTxDetail } from "@/services/tx";

export const TxDetailPage = () => {
  const route = getRouteApi("/tx/$hash");
  const { hash } = route.useParams();

  const { data: txDetailData, isLoading } = useFetchTxDetail(hash);
  const txDetail = txDetailData?.mini_tx_detail?.[0];

  const inputs = txDetail?.inputs ?? [];
  const outputs = txDetail?.outputs ?? [];

  const txTabItems = [
    {
      key: "overview",
      label: "Overview",
      content: (
        <OverviewTab inputs={inputs} outputs={outputs} isLoading={isLoading} />
      ),
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
          label: (
            <span className='inline pt-1/2'>
              Epoch ({txDetail?.epoch_no ?? "-"})
            </span>
          ),
        },
        {
          label: (
            <span className='inline pt-1/2'>
              Block ({txDetail?.block_height ?? "-"})
            </span>
          ),
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
