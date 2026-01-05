import { createFileRoute } from "@tanstack/react-router";

import { AddressListPage } from "@/pages/address/AddressListPage";

export const Route = createFileRoute("/address/")({
  component: AddressListPage,
});
