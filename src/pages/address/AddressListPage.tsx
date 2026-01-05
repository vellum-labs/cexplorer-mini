import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";

export const AddressListPage: FC = () => {
  return (
    <PageBase
      title='Addresses'
      breadcrumbItems={[{ label: "Addresses" }]}
      metadataTitle='addressList'
    >
      <></>
    </PageBase>
  );
};
