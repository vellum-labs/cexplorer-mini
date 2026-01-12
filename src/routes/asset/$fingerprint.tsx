import { createFileRoute } from "@tanstack/react-router";
import { AssetDetailPage } from "@/pages/asset/AssetDetailPage";

export const Route = createFileRoute("/asset/$fingerprint")({
  component: AssetDetailPage,
});
