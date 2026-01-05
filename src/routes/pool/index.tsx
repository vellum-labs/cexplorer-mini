import { createFileRoute } from "@tanstack/react-router";
import { PoolListPage } from "@/pages/pool/PoolListPage";

export const Route = createFileRoute("/pool/")({
  component: PoolListPage,
});
