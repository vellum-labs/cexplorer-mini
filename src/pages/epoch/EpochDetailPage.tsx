import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";

import { EpochSummary } from "@/components/epoch/overview/EpochSummary";
import { EpochPots } from "@/components/epoch/overview/EpochPots";

import { BlockListPage } from "../block/BlockListPage";
import { TxListPage } from "../tx/TxListPage";
import { EpochParameters } from "@/components/epoch/tabs/EpochParameters";

import { getRouteApi } from "@tanstack/react-router";
import { useFetchEpochDetail } from "@/services/epoch";

export const EpochDetailPage: FC = () => {
  const route = getRouteApi("/epoch/$no");
  const { no } = route.useParams();

  const { data: epochDetailData } = useFetchEpochDetail(no);
  const epochDetail = epochDetailData?.mini_epoch_detail?.[0];

  const epochNo = parseInt(no, 10);

  const epochTabItems = [
    {
      key: "blocks",
      label: "Blocks",
      content: <BlockListPage tab epochNo={epochNo} />,
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
      content: <EpochParameters epochParam={epochDetail?.epoch_param?.[0]} />,
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
            <EpochSummary epochDetail={epochDetail} />
            <EpochPots adaPots={epochDetail?.ada_pots?.[0]} />
          </div>
        </div>
      </section>
      <Tabs items={epochTabItems} withMargin={false} />
    </PageBase>
  );
};
