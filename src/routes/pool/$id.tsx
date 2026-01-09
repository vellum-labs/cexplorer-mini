import { createFileRoute } from "@tanstack/react-router";

import { PoolDetailPage } from "@/pages/pool/PoolDetailPage";

export const Route = createFileRoute("/pool/$id")({
  component: PoolDetailPage,
});
