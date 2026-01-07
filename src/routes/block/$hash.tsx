import { createFileRoute } from "@tanstack/react-router";

import { BlockDetailPage } from "@/pages/block/BlockDetailPage";

export const Route = createFileRoute("/block/$hash")({
  component: BlockDetailPage,
});
