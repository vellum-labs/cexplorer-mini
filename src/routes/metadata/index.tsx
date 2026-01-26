import { createFileRoute } from "@tanstack/react-router";

import { MetadataListPage } from "@/pages/metadata/MetadataListPage";

export const Route = createFileRoute("/metadata/")({
  component: MetadataListPage,
});
