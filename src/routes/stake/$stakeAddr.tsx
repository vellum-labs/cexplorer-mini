import { createFileRoute } from "@tanstack/react-router";
import { StakeDetailPage } from "@/pages/stake/StakeDetailPage";

export const Route = createFileRoute("/stake/$stakeAddr")({
  component: StakeDetailPage,
});
