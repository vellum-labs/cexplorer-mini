import type { FC } from "react";

import { DrepDetailOverview } from "@/components/drep/DrepDetailOverview";
import { HeaderBannerSubtitle, Tabs } from "@vellumlabs/cexplorer-sdk";
import { PageBase } from "@/components/global/PageBase";
import { AboutTab } from "@/components/drep/tabs/AboutTab";
import { VotesTab } from "@/components/drep/tabs/VotesTab";
import { DelegatorsTab } from "@/components/pool/tabs/DelegatorsTab";

import { formatString } from "@vellumlabs/cexplorer-sdk";

export const DrepDetailPage: FC = () => {
  const tabs = [
    {
      key: "gov_actions",
      label: "Votes",
      content: <VotesTab />,
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
      content: (
        <AboutTab
          data={{
            image_url: "-",
            given_name: "Wallet name",
            objectives: "objectives",
            motivations: "motivations",
            qualifications: "qualifications",
            payment_address: "payment_address",
          }}
        />
      ),
      visible: true,
    },
  ];

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
      <Tabs items={tabs} />
    </PageBase>
  );
};
