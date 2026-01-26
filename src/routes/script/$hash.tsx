import { createFileRoute } from "@tanstack/react-router";

import { ScriptDetailPage } from "@/pages/script/ScriptDetailPage";

export const Route = createFileRoute("/script/$hash")({
  component: ScriptDetailPage,
});
