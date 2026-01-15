import type { FC } from "react";

import { Dropdown } from "@vellumlabs/cexplorer-sdk/Dropdown";
import { MainLogo } from "@vellumlabs/cexplorer-sdk/MainLogo";
import { SettingsDropdown } from "../global/SettingsDropdown";

import { navigationOptions } from "@/constants/navigationOptions";

export const Navbar: FC = () => {
  return (
    <header>
      <nav className='flex h-[75px] w-full items-center justify-center border-b border-borderFaded bg-cardBg py-2 pr-2 lg:pr-0'>
        <div className='flex w-full max-w-desktop justify-between p-mobile md:px-desktop md:py-mobile'>
          <div className='flex items-center gap-1'>
            <MainLogo className='-translate-x-[6px]' network='mainnet' />
          </div>
          <div className='hidden items-center gap-2 xl:flex xl:h-[75px]'>
            <Dropdown
              id='blockchain'
              label='Blockchain'
              options={navigationOptions.blockchain}
              withBorder
              wrapperClassname='z-[50]'
            />
            <Dropdown
              id='staking'
              label='Staking'
              options={navigationOptions.staking}
              withBorder
              wrapperClassname='z-[50]'
            />
            <Dropdown
              id='governance'
              label='Governance'
              options={navigationOptions.governance}
              withBorder
              wrapperClassname='z-[50]'
            />
            <Dropdown
              id='assets'
              label='Assets'
              options={navigationOptions.assets}
              withBorder
              wrapperClassname='z-[50]'
            />
            <Dropdown
              id='tools'
              label='Tools'
              options={navigationOptions.tools}
              withBorder
              wrapperClassname='z-[50]'
            />
          </div>
          <div className='hidden items-center gap-3 md:flex'>
            <SettingsDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};
