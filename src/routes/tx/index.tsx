import { createFileRoute } from "@tanstack/react-router";

import { TxListPage } from "@/pages/tx/TxListPage";

export const Route = createFileRoute("/tx/")({
  component: TxListPage,
});
