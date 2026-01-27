import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { ScriptDetailOverview } from "@/components/script/ScriptDetailOverview";
import { RedeemersTab } from "@/components/script/tabs/RedeemersTab";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";

import { getRouteApi } from "@tanstack/react-router";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { useFetchScriptDetail } from "@/services/script";

export const ScriptDetailPage: FC = () => {
  const route = getRouteApi("/script/$hash");
  const { hash } = route.useParams();

  const { data, isLoading } = useFetchScriptDetail(hash);
  const scriptDetail = data?.mini_script_detail?.[0];

  const tabs = [
    {
      key: "redeemers",
      label: "Redeemers",
      content: <RedeemersTab scriptHash={hash} />,
      visible: true,
    },
  ];

  return (
    <PageBase
      metadataTitle='scriptDetail'
      metadataReplace={{
        before: "%hash%",
        after: hash,
      }}
      title='Script Detail'
      breadcrumbItems={[
        {
          label: <span className='inline pt-1/2'>Script List</span>,
          link: "/script",
        },
        {
          label: <span className=''>{formatString(hash, "longer")}</span>,
          ident: hash,
        },
      ]}
      subTitle={
        <HeaderBannerSubtitle
          title='Script'
          hashString={formatString(hash ?? "", "long")}
          hash={hash}
        />
      }
    >
      <ScriptDetailOverview data={scriptDetail} isLoading={isLoading} />
      <Tabs items={tabs} apiLoading={isLoading} />
    </PageBase>
  );
};
