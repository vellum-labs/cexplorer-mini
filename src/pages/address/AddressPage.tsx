import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { Tabs } from "@vellumlabs/cexplorer-sdk";

import { AddressesTab } from "@/components/address/tabs/AddressesTab";
import { StakeTab } from "@/components/address/tabs/StakeTab";

export const AddressPage: FC = () => {
  const tabs = [
    {
      key: "address",
      label: "Addresses",
      content: <AddressesTab />,
      visible: true,
    },
    {
      key: "stake",
      label: "Stake accounts",
      content: <StakeTab />,
      visible: true,
    },
  ];

  return (
    <PageBase
      title='Addresses'
      breadcrumbItems={[{ label: "Addresses" }]}
      metadataTitle='addressList'
    >
      <Tabs items={tabs} />
    </PageBase>
  );
};
