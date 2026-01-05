import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "@vellumlabs/cexplorer-sdk/style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
