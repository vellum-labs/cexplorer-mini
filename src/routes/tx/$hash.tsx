import { createFileRoute } from "@tanstack/react-router";
import TxDetailPage from "@/pages/tx/TxDetailPage";

export const Route = createFileRoute("/tx/$hash")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TxDetailPage />;
}
