import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { ScriptDetailOverview } from "@/components/script/ScriptDetailOverview";

import { getRouteApi } from "@tanstack/react-router";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";

export const ScriptDetailPage: FC = () => {
  const route = getRouteApi("/script/$hash");
  const { hash } = route.useParams();

  return (
    <PageBase
      metadataTitle='scriptDetail'
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
    >
      <ScriptDetailOverview />
    </PageBase>
  );
};
