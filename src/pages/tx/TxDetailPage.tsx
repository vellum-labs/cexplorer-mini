import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import { TxDetailOverview } from "@/components/tx/TxDetailOverview";
import { PageBase } from "@/components/global/PageBase";
import { WithdrawalsTab } from "../../components/tx/tabs/WithdrawalsTab";
import { ReferenceInputsTab } from "../../components/tx/tabs/ReferenceInputsTab";
import { CollateralTab } from "../../components/tx/tabs/CollateralTab";
import { OverviewTab } from "../../components/tx/tabs/OverviewTab";
import { ContentTab } from "../../components/tx/tabs/ContentTab";
import { ContractsTab } from "../../components/tx/tabs/ContractsTab";
import { MetadataTab } from "../../components/tx/tabs/MetadataTab";
import { getRouteApi } from "@tanstack/react-router";
import { useFetchTxDetail } from "@/services/tx";

export const TxDetailPage = () => {
  const route = getRouteApi("/tx/$hash");
  const { hash } = route.useParams();

  const { data: txDetailData, isLoading } = useFetchTxDetail(hash);
  const txDetail = txDetailData?.mini_tx_detail?.[0];

  const inputs = txDetail?.inputs ?? [];
  const outputs = txDetail?.outputs ?? [];
  const contracts = txDetail?.plutus_contracts ?? null;
  const contractsCount = contracts?.length ?? 0;
  const collateralInputs = txDetail?.collateral_inputs ?? null;
  const collateralCount = collateralInputs?.length ?? 0;
  const withdrawals = txDetail?.withdrawals ?? null;
  const withdrawalsCount = withdrawals?.length ?? 0;
  const referenceInputs = txDetail?.reference_inputs ?? null;
  const referenceInputsCount = referenceInputs?.length ?? 0;
  const metadata = txDetail?.metadata ?? null;
  const hasMetadata = metadata && Object.keys(metadata).length > 0;

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
      content: <ContentTab inputs={inputs} outputs={outputs} />,
      visible: true,
    },
    {
      key: "contracts",
      label: (
        <span className='flex items-center gap-1'>
          Contracts{" "}
          {contractsCount > 0 && (
            <Badge small color='gray'>
              {contractsCount}
            </Badge>
          )}
        </span>
      ),
      content: <ContractsTab contracts={contracts} isLoading={isLoading} />,
      visible: contractsCount > 0,
    },
    {
      key: "collateral",
      label: (
        <span className='flex items-center gap-1'>
          Collateral
          {collateralCount > 0 && (
            <Badge small color='gray'>
              {collateralCount}
            </Badge>
          )}
        </span>
      ),
      content: (
        <CollateralTab
          collateralInputs={collateralInputs}
          isLoading={isLoading}
        />
      ),
      visible: collateralCount > 0,
    },
    {
      key: "withdrawals",
      label: (
        <span className='flex items-center gap-1'>
          Withdrawals
          {withdrawalsCount > 0 && (
            <Badge small color='gray'>
              {withdrawalsCount}
            </Badge>
          )}
        </span>
      ),
      content: (
        <WithdrawalsTab withdrawals={withdrawals} isLoading={isLoading} />
      ),
      visible: withdrawalsCount > 0,
    },
    {
      key: "inputs",
      label: (
        <span className='flex items-center gap-1'>
          Reference inputs
          {referenceInputsCount > 0 && (
            <Badge small color='gray'>
              {referenceInputsCount}
            </Badge>
          )}
        </span>
      ),
      content: (
        <ReferenceInputsTab
          referenceInputs={referenceInputs}
          isLoading={isLoading}
        />
      ),
      visible: referenceInputsCount > 0,
    },
    {
      key: "metadata",
      label: "Metadata",
      content: <MetadataTab metadata={metadata} isLoading={isLoading} />,
      visible: !!hasMetadata,
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
      <TxDetailOverview txDetail={txDetail} isLoading={isLoading} />
      <Tabs items={txTabItems} mobileItemsCount={3} />
    </PageBase>
  );
};
