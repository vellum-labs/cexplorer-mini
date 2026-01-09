import type { FC } from "react";

import { PoolDetailOverview } from "@/components/pool/PoolDetailOverview";
import { PageBase } from "@/components/global/PageBase";
import { BlockListPage } from "../block/BlockListPage";
import { RewardsTab } from "@/components/pool/tabs/RewardsTab";

import {
  formatString,
  HeaderBannerSubtitle,
  Tabs,
} from "@vellumlabs/cexplorer-sdk";

export const PoolDetailPage: FC = () => {
  const hash = "dd7330d29709deb4e8dff5b49d50b174c9c884678992cca4a68d96d7";

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
      content: <RewardsTab />,
      visible: true,
    },
    {
      key: "delegators",
      label: "Delegators",
      content: <></>,
      visible: true,
    },
    {
      key: "about",
      label: "About",
      content: <></>,
      visible: true,
    },
  ];

  return (
    <PageBase
      metadataTitle='poolDetail'
      metadataReplace={{
        before: "%name%",
        after: "AzureADA2",
      }}
      title={
        <span className='mt-1/2 flex w-full items-center gap-1'>
          <span className='flex-1 break-all'>[AZUR2] AzureADA2</span>
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
      <PoolDetailOverview hash={hash} />
      <Tabs items={tabs} />
    </PageBase>
  );
};
