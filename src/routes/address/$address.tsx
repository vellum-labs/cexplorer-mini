import { createFileRoute } from "@tanstack/react-router";
import { AddressDetailPage } from "@/pages/address/AddressDetailPage";

export const Route = createFileRoute("/address/$address")({
  component: AddressDetailPage,
});
