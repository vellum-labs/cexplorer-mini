import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk/LoadingSkeleton";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { getRouteApi } from "@tanstack/react-router";
import { type FC } from "react";
import { StakeDetailOverview } from "@/components/stake/StakeDetailOverview";
import { TxListPage } from "../tx/TxListPage";
import { PageBase } from "@/components/global/PageBase";
import { AssetListPage } from "../asset/AssetListPage";
import { RewardsTab } from "@/components/pool/tabs/RewardsTab";
import { WithdrawalsTab } from "@/components/address/tabs/WithdrawalsTab";
import { AddressesTab } from "@/components/address/tabs/AddressesTab";

export const StakeDetailPage: FC = () => {
  const route = getRouteApi("/stake/$stakeAddr");
  const { stakeAddr: address } = route.useParams();

  const stakeQuery = { data: null, isLoading: false, isError: false };

  const tabs = [
    {
      key: "assets",
      label: "Assets",
      content: <AssetListPage tab />,
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
      content: <WithdrawalsTab />,
      visible: true,
    },
    {
      key: "addresses",
      label: "Addresses",
      content: <AddressesTab />,
      visible: true,
    },
    {
      key: "rewards",
      label: "Rewards",
      content: <RewardsTab />,
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
