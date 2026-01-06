import type { FC } from "react";

import { useThemeStore } from "@vellumlabs/cexplorer-sdk";
import { useEffect } from "react";

export const App: FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme) {
      document.startViewTransition(() => {
        document.documentElement.setAttribute("data-theme", theme);
      });
    }
  }, [theme]);

  return null;
};
