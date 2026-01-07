import { EpochDetailPage } from "@/pages/epoch/EpochDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/epoch/$no")({
  component: EpochDetailPage,
});
