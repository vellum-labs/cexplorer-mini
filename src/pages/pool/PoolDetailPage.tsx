import type { FC } from "react";

import { PoolDetailOverview } from "@/components/pool/PoolDetailOverview";
import { PageBase } from "@/components/global/PageBase";
import { BlockListPage } from "../block/BlockListPage";
import { RewardsTab } from "@/components/pool/tabs/RewardsTab";
import { DelegatorsTab } from "@/components/pool/tabs/DelegatorsTab";
import { AboutTab } from "@/components/pool/tabs/AboutTab";
import { useFetchPoolDetail } from "@/services/pool";

import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import { useParams } from "@tanstack/react-router";

export const PoolDetailPage: FC = () => {
  const { id: hash } = useParams({ from: "/pool/$id" });
  const { data, isLoading } = useFetchPoolDetail(hash);
  const poolDetail = data?.mini_pool_detail?.[0];

  const tabs = [
    {
      key: "blocks",
      label: "Blocks",
      content: <BlockListPage tab />,
      visible: true,
    },
    {
      key: "rewards",
      label: "Rewards",
      content: <RewardsTab stats={poolDetail?.stat} isLoading={isLoading} />,
      visible: true,
    },
    {
      key: "delegators",
      label: "Delegators",
      content: <DelegatorsTab />,
      visible: true,
    },
    {
      key: "about",
      label: "About",
      content: <AboutTab />,
      visible: true,
    },
  ];

  return (
    <PageBase
      metadataTitle='poolDetail'
      metadataReplace={{
        before: "%name%",
        after: poolDetail?.description || hash,
      }}
      title={
        <span className='mt-1/2 flex w-full items-center gap-1'>
          <span className='flex-1 break-all'>
            {poolDetail?.description || formatString(hash, "long")}
          </span>
        </span>
      }
      breadcrumbItems={[
        {
          label: <span className='inline pt-1/2'>Pools</span>,
          link: "/pool",
        },
        {
          label: <span className=''>{formatString(hash, "long")}</span>,
          ident: hash,
        },
      ]}
      subTitle={
        <div className='flex flex-col'>
          <HeaderBannerSubtitle
            hashString={formatString(hash, "long")}
            hash={hash}
            className='!mb-0'
          />
          <HeaderBannerSubtitle
            hashString={formatString(hash, "long")}
            hash={hash}
            title='Pool ID'
            className='!mt-0'
          />
        </div>
      }
      homepageAd
    >
      <PoolDetailOverview poolDetail={poolDetail} isLoading={isLoading} />
      <Tabs items={tabs} />
    </PageBase>
  );
};
