import { createFileRoute } from "@tanstack/react-router";

import { BlockListPage } from "@/pages/block/BlockListPage";

export const Route = createFileRoute("/block/")({
  component: BlockListPage,
});
