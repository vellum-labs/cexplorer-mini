import type { FC } from "react";

import { AddressDetailOverview } from "@/components/address/AddressDetailOverview";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk/HeaderBannerSubtitle";
import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk/LoadingSkeleton";
import { Tabs } from "@vellumlabs/cexplorer-sdk/Tabs";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { getRouteApi } from "@tanstack/react-router";
import { PageBase } from "@/components/global/PageBase";
import { UtxoTab } from "@/components/address/tabs/UtxoTab";
import { AssetListPage } from "../asset/AssetListPage";
import { TxListPage } from "../tx/TxListPage";
import { StakeRewardsTab } from "@/components/stake/tabs/StakeRewardsTab";
import { useFetchAddressDetail, useFetchAddressStake } from "@/services/address";

export const AddressDetailPage: FC = () => {
  const route = getRouteApi("/address/$address");
  const { address } = route.useParams();

  const { data, isLoading, isError } = useFetchAddressDetail(address);
  const { data: stakeAddress, isLoading: isStakeLoading } = useFetchAddressStake(address);
  const addressDetail = data?.mini_get_address?.[0];

  const isShelleyAddress = address?.startsWith("addr");

  const tabs = [
    {
      key: "assets",
      label: "Assets",
      content: <AssetListPage tab assetData={addressDetail ? (addressDetail.asset ?? null) : undefined} loading={isLoading} />,
      visible: true,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab address={address} />,
      visible: true,
    },
    {
      key: "utxos",
      label: "UTXOs",
      content: <UtxoTab address={address} />,
      visible: true,
    },
    {
      key: "rewards",
      label: "Rewards",
      content: <StakeRewardsTab stakeAddress={stakeAddress ?? undefined} />,
      visible: isShelleyAddress && (isStakeLoading || !!stakeAddress),
    },
  ];

  return (
    <PageBase
      metadataTitle='addressDetail'
      metadataReplace={{ before: "%address%", after: address }}
      breadcrumbItems={[
        {
          label: "Address",
        },
        {
          label: formatString(address, "long"),
          ident: address,
        },
      ]}
      title={<div className='flex items-center gap-1/2'>Address detail</div>}
      subTitle={
        <HeaderBannerSubtitle
          title='Address'
          hashString={formatString(address ?? "", "long")}
          hash={address}
        />
      }
    >
      <section className='flex w-full flex-col items-center'>
        <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile pb-3 pt-1.5 md:px-desktop xl:flex-nowrap xl:justify-start'>
          <div className='flex w-full shrink grow flex-wrap items-stretch gap-3'>
            {isLoading || isError ? (
              <>
                <LoadingSkeleton
                  height='227px'
                  rounded='xl'
                  className='grow basis-[300px] px-4 py-2'
                />
                <LoadingSkeleton
                  height='227px'
                  rounded='xl'
                  className='grow basis-[300px] px-4 py-2'
                />
                <LoadingSkeleton
                  height='227px'
                  rounded='xl'
                  className='grow basis-[300px] px-4 py-2'
                />
              </>
            ) : (
              <AddressDetailOverview
                data={addressDetail}
                address={address}
              />
            )}
          </div>
        </div>
      </section>
      <Tabs items={tabs} wrapperClassname='mt-0' />
    </PageBase>
  );
};
