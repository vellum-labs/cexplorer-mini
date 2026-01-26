import { createFileRoute } from "@tanstack/react-router";

import { ScriptListPage } from "@/pages/script/ScriptListPage";

export const Route = createFileRoute("/script/")({
  component: ScriptListPage,
});
