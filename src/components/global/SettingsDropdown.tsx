import type { FC } from "react";
import type { NavigationOptions } from "@vellumlabs/cexplorer-sdk";

import { Moon, Settings, Sun } from "lucide-react";

import { Dropdown, useThemeStore } from "@vellumlabs/cexplorer-sdk";

export const SettingsDropdown: FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  const themeIcon = theme === "light" ? <Moon size={20} /> : <Sun size={20} />;

  const settingsOptions: NavigationOptions = [
    {
      label: (
        <button className='flex w-full justify-between'>
          <span>Theme</span>
          {themeIcon}
        </button>
      ),
      onClick: toggleTheme,
    },
  ];

  return (
    <Dropdown
      id='navSettings'
      disableHover
      hideChevron
      label={
        <p className='flex gap-1'>
          <Settings />
        </p>
      }
      options={settingsOptions}
      width='200px'
      poppoverClassname='border border-border !p-0 !w-[200px]'
    />
  );
};
