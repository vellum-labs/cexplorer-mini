import type { FC } from "react";

import { AssetDetailOverview } from "@/components/asset/AssetDetailOverview";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import { TxListPage } from "../tx/TxListPage";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { getRouteApi } from "@tanstack/react-router";
import { PageBase } from "@/components/global/PageBase";
import { AssetMintTab } from "@/components/asset/tabs/AssetMintTab";
import { AssetOwnersTab } from "@/components/asset/tabs/AssetOwnersTab";

export const AssetDetailPage: FC = () => {
  const route = getRouteApi("/asset/$fingerprint");
  const { fingerprint } = route.useParams();

  const assetDetailQuery = { data: null, isLoading: false };

  const tabs = [
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab />,
      visible: true,
    },
    {
      key: "mints",
      label: "Mints",
      content: <AssetMintTab />,
      visible: true,
    },
    {
      key: "metadata",
      label: "Metadata",
      content: <></>,
      visible: true,
    },
    {
      key: "owners",
      label: "Owners",
      content: <AssetOwnersTab />,
      visible: true,
    },
  ];

  return (
    <PageBase
      title={
        <span className='flex-1 break-all'>
          {formatString(fingerprint, "longer")}
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
    >
      <section className='flex w-full justify-center'>
        <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile md:px-desktop xl:flex-nowrap xl:justify-start'>
          <div className='flex grow basis-[980px] flex-wrap items-stretch gap-3'>
            <AssetDetailOverview />
          </div>
        </div>
      </section>
      <Tabs items={tabs} apiLoading={assetDetailQuery.isLoading} />
    </PageBase>
  );
};
