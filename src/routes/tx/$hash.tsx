import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tx/$hash")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tx/$hash"!</div>;
}
