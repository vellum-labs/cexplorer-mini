import { Homepage } from "@/pages/homepage/Homepage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Homepage,
});
