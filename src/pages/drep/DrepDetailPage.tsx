import { DrepDetailOverview } from "@/components/drep/DrepDetailOverview";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk";
import type { FC } from "react";
import { formatString } from "@vellumlabs/cexplorer-sdk";
import { PageBase } from "@/components/global/PageBase";

export const DrepDetailPage: FC = () => {
  return (
    <PageBase
      metadataTitle='drepDetail'
      title='DRep Detail'
      metadataReplace={{
        before: "%drep%",
        after: "hsdhadhashdhashd",
      }}
      breadcrumbItems={[
        {
          label: <span className='inline pt-1/2'>Governance</span>,
        },
        {
          label: (
            <span className='inline pt-1/2'>Delegated representatives</span>
          ),
          link: "/drep",
        },
        {
          label: (
            <span className=''>
              {formatString("dasdasdsadasdasdasdsadasdas", "long")}
            </span>
          ),
          ident: "dasdasdsadasdasdasdsadasdas",
        },
      ]}
      subTitle={
        <HeaderBannerSubtitle
          title='Drep ID'
          hashString={formatString("dasdasdsadasdasdasdsadasdas", "long")}
          hash={"dasdasdsadasdasdasdsadasdas"}
        />
      }
    >
      <DrepDetailOverview />
    </PageBase>
  );
};
