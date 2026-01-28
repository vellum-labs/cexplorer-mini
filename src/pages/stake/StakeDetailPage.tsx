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
import { StakeRewardsTab } from "@/components/stake/tabs/StakeRewardsTab";
import { WithdrawalsTab } from "@/components/address/tabs/WithdrawalsTab";
import { useFetchStakeDetail } from "@/services/address";

export const StakeDetailPage: FC = () => {
  const route = getRouteApi("/stake/$stakeAddr");
  const { stakeAddr: address } = route.useParams();

  const { data, isLoading, isError } = useFetchStakeDetail(address);
  const stakeDetail = data?.mini_account_detail?.[0];

  const tabs = [
    {
      key: "assets",
      label: "Assets",
      content: <AssetListPage tab assetData={stakeDetail ? (stakeDetail.asset ?? null) : undefined} loading={isLoading} />,
      visible: true,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab address={address} />,
      visible: true,
    },
    {
      key: "withdrawals",
      label: "Withdrawals",
      content: <WithdrawalsTab stakeAddress={address} />,
      visible: true,
    },
    {
      key: "rewards",
      label: "Rewards",
      content: <StakeRewardsTab stakeAddress={address} />,
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
            {isLoading || isError ? (
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
                data={stakeDetail}
                stakeAddress={address}
              />
            )}
          </div>
        </div>
      </section>
      <Tabs items={tabs} apiLoading={isLoading} />
    </PageBase>
  );
};
