import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.ts";

import "@vellumlabs/cexplorer-sdk/style.css";
import "./styles/view-transitions.css";

export const router = createRouter({
  routeTree,
  defaultViewTransition: {
    types: ({ pathChanged }) => {
      if (!pathChanged) {
        return false;
      }

      return ["fade"];
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>,
);
