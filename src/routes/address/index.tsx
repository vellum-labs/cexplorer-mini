import { createFileRoute } from "@tanstack/react-router";

import { AddressPage } from "@/pages/address/AddressPage";

export const Route = createFileRoute("/address/")({
  component: AddressPage,
});
