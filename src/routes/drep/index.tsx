import { DrepListPage } from "@/pages/governance/DrepListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/drep/")({
  component: DrepListPage,
});
