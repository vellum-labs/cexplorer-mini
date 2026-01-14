import type { FC } from "react";

import { AddressDetailOverview } from "@/components/address/AddressDetailOverview";
import { HeaderBannerSubtitle } from "@vellumlabs/cexplorer-sdk";
import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk";
import { Tabs } from "@vellumlabs/cexplorer-sdk";
import { TxListPage } from "../tx/TxListPage";
import { formatString } from "@vellumlabs/cexplorer-sdk";
import { getRouteApi } from "@tanstack/react-router";
import { PageBase } from "@/components/global/PageBase";
import { AddressesTab } from "@/components/address/tabs/AddressesTab";

export const AddressDetailPage: FC = () => {
  const route = getRouteApi("/address/$address");
  const { address } = route.useParams();

  const addressQuery = { data: { data: [] }, isLoading: false, isError: false };

  const tabs = [
    {
      key: "assets",
      label: "Assets",
      content: (
        <div className='p-4 text-grayTextPrimary'>Assets - Coming soon</div>
      ),
      visible: true,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TxListPage tab />,
      visible: true,
    },
    {
      key: "utxos",
      label: "UTXOs",
      content: (
        <div className='p-4 text-grayTextPrimary'>UTXOs - Coming soon</div>
      ),
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
      content: (
        <div className='p-4 text-grayTextPrimary'>Rewards - Coming soon</div>
      ),
      visible: true,
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
            {addressQuery.isLoading || addressQuery.isError ? (
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
                data={addressQuery.data?.data ?? []}
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
