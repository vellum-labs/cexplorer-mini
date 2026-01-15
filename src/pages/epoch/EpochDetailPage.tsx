import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";

import { EpochSummary } from "@/components/epoch/overview/EpochSummary";
import { EpochLostAndCost } from "@/components/epoch/overview/EpochLostAndCost";
import { EpochPots } from "@/components/epoch/overview/EpochPots";

import { BlockListPage } from "../block/BlockListPage";
import { TxListPage } from "../tx/TxListPage";
import { EpochParameters } from "@/components/epoch/tabs/EpochParameters";

import { getRouteApi } from "@tanstack/react-router";

export const EpochDetailPage: FC = () => {
  const route = getRouteApi("/epoch/$no");
  const { no } = route.useParams();

  const epochTabItems = [
    {
      key: "blocks",
      label: "Blocks",
      content: <BlockListPage tab />,
      visible: true,
    },
    {
      key: "tx",
      label: "Transactions",
      content: <TxListPage tab />,
      visible: true,
    },
    {
      key: "parameters",
      label: "Parameters",
      content: <EpochParameters />,
      visible: true,
    },
  ];

  return (
    <PageBase
      metadataTitle='epochDetail'
      metadataReplace={{
        before: "%epoch%",
        after: no,
      }}
      title='Epoch Detail'
      breadcrumbItems={[{ label: "Epochs", link: "/epoch" }, { label: no }]}
      homepageAd
    >
      <section className='flex w-full justify-center py-3'>
        <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile md:px-desktop xl:flex-nowrap xl:justify-start'>
          <div className='flex grow basis-[980px] flex-wrap items-stretch gap-3'>
            <EpochSummary />
            <EpochLostAndCost />
            <EpochPots />
          </div>
        </div>
      </section>
      <Tabs items={epochTabItems} withMargin={false} />
    </PageBase>
  );
};
