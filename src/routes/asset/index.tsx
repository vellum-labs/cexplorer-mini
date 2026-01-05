import { createFileRoute } from "@tanstack/react-router";

import { AssetListPage } from "@/pages/asset/AssetListPage";

export const Route = createFileRoute("/asset/")({
  component: AssetListPage,
});
