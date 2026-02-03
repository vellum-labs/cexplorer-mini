import type { FC } from "react";
import { useMemo } from "react";

import { AssetDetailOverview } from "@/components/asset/AssetDetailOverview";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import { TxListPage } from "../tx/TxListPage";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { getRouteApi } from "@tanstack/react-router";
import { PageBase } from "@/components/global/PageBase";
import { AssetMintTab } from "@/components/asset/tabs/AssetMintTab";
import { AssetMetadataTab } from "@/components/asset/tabs/AssetMetadataTab";
import { AssetOwnersTab } from "@/components/asset/tabs/AssetOwnersTab";
import { useFetchAssetDetail } from "@/services/asset";

export const AssetDetailPage: FC = () => {
  const route = getRouteApi("/asset/$fingerprint");
  const { fingerprint } = route.useParams();

  const { data, isLoading } = useFetchAssetDetail(fingerprint);
  const assetDetail = data?.mini_asset_detail?.[0];

  const mintTxHashes = useMemo(() => {
    return assetDetail?.mint?.map(m => m.encode) ?? [];
  }, [assetDetail?.mint]);

  const tabs = [
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab fingerprint={fingerprint} />,
      visible: true,
    },
    {
      key: "mints",
      label: "Mints",
      content: <AssetMintTab assetId={assetDetail?.id} />,
      visible: true,
    },
    {
      key: "metadata",
      label: "Metadata",
      content: (
        <AssetMetadataTab mintTxHashes={mintTxHashes} />
      ),
      visible: true,
    },
    {
      key: "owners",
      label: "Owners",
      content: <AssetOwnersTab assetId={assetDetail?.id} />,
      visible: true,
    },
  ];

  return (
    <PageBase
      title={
        <span className='flex-1 break-all'>
          {assetDetail?.name || formatString(fingerprint, "longer")}
        </span>
      }
      breadcrumbItems={[
        {
          label: "Assets",
          link: "/asset",
        },
        { label: formatString(fingerprint, "long"), ident: fingerprint },
      ]}
      subTitle={
        <HeaderBannerSubtitle
          hash={fingerprint}
          hashString={formatString(fingerprint, "long")}
          title='Asset ID'
        />
      }
      metadataTitle='assetDetail'
      metadataReplace={{ before: "%fingerprint%", after: assetDetail?.name || fingerprint }}
    >
      <section className='flex w-full justify-center'>
        <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile md:px-desktop xl:flex-nowrap xl:justify-start'>
          <div className='flex grow basis-[980px] flex-wrap items-stretch gap-3'>
            <AssetDetailOverview
              assetDetail={assetDetail}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
      <Tabs items={tabs} apiLoading={isLoading} />
    </PageBase>
  );
};
