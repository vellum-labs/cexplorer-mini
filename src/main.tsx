import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@vellumlabs/cexplorer-sdk/style.css";
import "./styles/view-transitions.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
