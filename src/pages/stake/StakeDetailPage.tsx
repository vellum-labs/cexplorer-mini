import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk";
import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk";
import { Tabs } from "@vellumlabs/cexplorer-sdk";
import { formatString } from "@vellumlabs/cexplorer-sdk";
import { getRouteApi } from "@tanstack/react-router";
import { type FC } from "react";
import { StakeDetailOverview } from "@/components/stake/StakeDetailOverview";
import { TxListPage } from "../tx/TxListPage";
import { PageBase } from "@/components/global/PageBase";

export const StakeDetailPage: FC = () => {
  const route = getRouteApi("/stake/$stakeAddr");
  const { stakeAddr: address } = route.useParams();

  const stakeQuery = { data: null, isLoading: false, isError: false };
  const data = stakeQuery.data;
  const assets = stakeQuery.data?.asset || [];

  const tabs = [
    {
      key: "assets",
      label: "Assets",
      content: <div className='p-4 text-grayTextPrimary'>Assets - Coming soon</div>,
      visible: true,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab />,
      visible: true,
    },
    {
      key: "withdrawals",
      label: "Withdrawals",
      content: <div className='p-4 text-grayTextPrimary'>Withdrawals - Coming soon</div>,
      visible: true,
    },
    {
      key: "addresses",
      label: "Addresses",
      content: <div className='p-4 text-grayTextPrimary'>Addresses - Coming soon</div>,
      visible: true,
    },
    {
      key: "delegations",
      label: "Delegations",
      content: <div className='p-4 text-grayTextPrimary'>Delegations - Coming soon</div>,
      visible: true,
    },
    {
      key: "rewards",
      label: "Rewards",
      content: <div className='p-4 text-grayTextPrimary'>Rewards - Coming soon</div>,
      visible: true,
    },
  ];

  return (
    <PageBase
      metadataTitle='stakeAddressDetail'
      metadataReplace={{
        before: "%address%",
        after: address,
      }}
      title='Stake Detail'
      breadcrumbItems={[
        { label: "Address" },
        { label: formatString(address, "long"), ident: address },
      ]}
      subTitle={
        <HeaderBannerSubtitle
          title='Stake address'
          hashString={formatString(address ?? "", "long")}
          hash={address}
        />
      }
    >
      <section className='flex w-full justify-center'>
        <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile md:px-desktop xl:flex-nowrap xl:justify-start'>
          <div className='flex grow basis-[980px] flex-wrap items-stretch gap-3'>
            {stakeQuery.isLoading || stakeQuery.isError ? (
              <>
                <LoadingSkeleton
                  height='330px'
                  rounded='xl'
                  className='grow basis-[410px] px-4 py-2'
                />
                <LoadingSkeleton
                  height='330px'
                  rounded='xl'
                  className='grow basis-[410px] px-4 py-2'
                />
              </>
            ) : (
              <StakeDetailOverview
                data={stakeQuery.data}
                stakeAddress={address}
              />
            )}
          </div>
        </div>
      </section>
      <Tabs items={tabs} apiLoading={stakeQuery.isLoading} />
    </PageBase>
  );
};
