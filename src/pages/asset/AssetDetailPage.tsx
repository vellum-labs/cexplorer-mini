import { AssetDetailOverview } from "@/components/asset/AssetDetailOverview";
import { AssetMetaDataTab } from "@/components/asset/tabs/AssetMetaDataTab";
import { AssetMintTab } from "@/components/asset/tabs/AssetMintTab";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk";
import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk";
import { Tabs } from "@vellumlabs/cexplorer-sdk";
import { Image } from "@vellumlabs/cexplorer-sdk";
import { useEffect, useState, type FC } from "react";
import { TxListPage } from "../tx/TxListPage";
import { AssetStatsTab } from "@/components/asset/tabs/AssetStatsTab";
import { encodeAssetName } from "@vellumlabs/cexplorer-sdk";
import { formatString } from "@vellumlabs/cexplorer-sdk";
import { getRouteApi } from "@tanstack/react-router";
import { PageBase } from "@/components/global/PageBase";

export const AssetDetailPage: FC = () => {
  const [title, setTitle] = useState<string>("");
  const route = getRouteApi("/asset/$fingerprint");
  const { fingerprint } = route.useParams();

  const assetDetailQuery = { data: null, isLoading: false };
  const assetSupply = assetDetailQuery.data?.data?.stat?.asset?.quantity;
  const assetStats = assetDetailQuery.data?.data?.stat?.asset?.stats;

  const tabs = [
    {
      key: "Stats",
      label: "Stats",
      content: <AssetStatsTab fingerprint={fingerprint} />,
      visible: true,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab />,
      visible: true,
    },
    {
      key: "mints",
      label: "Mints",
      content: (
        <AssetMintTab
          name={(assetDetailQuery.data?.data?.name ?? 0) as number}
          policy={assetDetailQuery.data?.data?.policy ?? ""}
        />
      ),
      visible: true,
    },
    {
      key: "metadata",
      label: "Metadata",
      content: (
        <AssetMetaDataTab
          name={assetDetailQuery.data?.data?.name}
          policy={assetDetailQuery.data?.data?.policy}
        />
      ),
      visible: true,
    },
    {
      key: "owners",
      label: "Owners",
      content: <div className='p-4 text-grayTextPrimary'>Owners - Coming soon</div>,
      visible: true,
    },
  ];

  useEffect(() => {
    if (assetDetailQuery?.data?.data?.name === undefined) return;
    setTitle(encodeAssetName(assetDetailQuery?.data?.data?.name || ""));
  }, [assetDetailQuery?.data?.data?.name]);

  const encodedNameArr = assetDetailQuery.data?.data?.name
    ? encodeAssetName(assetDetailQuery.data.data.name) || ""
    : "";

  return (
    <PageBase
      title={
        <span className='mt-1/2 flex w-full items-center gap-1'>
          <div className='group relative flex items-center'>
            <Image
              src={""}
              type='asset'
              className='aspect-square flex-shrink-0 rounded-max'
              height={35}
              width={35}
            />
          </div>
          <span className='flex-1 break-all'>
            {formatString(fingerprint, "longer")}
          </span>
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
            {assetDetailQuery.isLoading ? (
              <>
                <LoadingSkeleton
                  height='328px'
                  rounded='xl'
                  className='grow basis-[410px] px-4 py-2'
                />
                <LoadingSkeleton
                  height='328px'
                  rounded='xl'
                  className='grow basis-[410px] px-4 py-2'
                />
                <LoadingSkeleton
                  height='328px'
                  rounded='xl'
                  className='grow basis-[410px] px-4 py-2'
                />
              </>
            ) : (
              <AssetDetailOverview
                data={assetDetailQuery}
                type={
                  assetSupply ? (assetSupply > 1 ? "token" : "nft") : "token"
                }
                isLoading={assetDetailQuery.isLoading}
              />
            )}
          </div>
        </div>
      </section>
      <Tabs items={tabs} apiLoading={assetDetailQuery.isLoading} />
    </PageBase>
  );
};
