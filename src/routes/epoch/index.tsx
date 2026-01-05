import { createFileRoute } from "@tanstack/react-router";

import { EpochListPage } from "@/pages/epoch/EpochListPage";

export const Route = createFileRoute("/epoch/")({
  component: EpochListPage,
});
