import { createFileRoute } from "@tanstack/react-router";
import { DrepDetailPage } from "@/pages/drep/DrepDetailPage";

export const Route = createFileRoute("/drep/$hash")({
  component: DrepDetailPage,
});
