import type { FC } from "react";

import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { MainLogo } from "@vellumlabs/cexplorer-sdk/MainLogo";
import { LinksColumn } from "../footer/LinksColumn";

import DiscordLogo from "@/resources/icons/discord.svg";
import GithubLogo from "@/resources/icons/github.svg";
import TelegramLogo from "@/resources/icons/telegram.svg";
import TwitterLogo from "@/resources/icons/twitter.svg";

import { useMemo } from "react";

import { formatString } from "@vellumlabs/cexplorer-sdk/Format";

export const Footer: FC = () => {
  const donationAddress =
    "addr1q9sz5kw40pmnkcmmfvssm5fy2vzkk7l0wu5szv25nnffkqnkc35qyrgnqu8tl96u5eejytgvtsqatr2ms6hrxhdzq4pslvp2rm";

  const footerLinks = useMemo(
    () => ({
      links: [
        {
          label: "Mainnet",
          href: "https://cexplorer.io/",
          target: "_blank" as const,
        },
        {
          label: "Preview",
          href: "https://preview.cexplorer.io/",
          target: "_blank" as const,
        },
        {
          label: "Preprod",
          href: "https://preprod.cexplorer.io/",
          target: "_blank" as const,
        },
      ],
      supportUs: [
        {
          label: "Patreon",
          href: "https://www.patreon.com/ADApools",
          target: "_blank" as const,
        },
        {
          label: "Buy me a coffe",
          href: "https://buymeacoffee.com/vellumlabs",
          target: "_blank" as const,
        },
        {
          label: "Report a bug",
          href: "https://github.com/vellum-labs/cexplorer-fe/issues",
          target: "_blank" as const,
        },
        {
          label: "Suggest a feature",
          href: "https://github.com/vellum-labs/cexplorer-fe/issues",
          target: "_blank" as const,
        },
      ],
    }),
    [],
  );

  return (
    <footer className='flex w-full flex-col items-center border-t border-borderFaded'>
      <div className='flex w-full justify-center'>
        <div className='flex w-full max-w-desktop flex-col p-mobile md:px-desktop md:py-mobile'>
          <section className='flex w-full flex-col gap-2 md:flex-row md:justify-between'>
            <div className='flex w-[250px] shrink-0 flex-col gap-3'>
              <MainLogo className='-translate-x-[5px]' network='mainnet' />
              <p className='w-full text-text-sm text-grayTextPrimary'>
                The oldest and most feature-rich Cardano explorer, serving you
                since the Incentivized Testnet.
              </p>
              <div className='flex gap-3'>
                <a href='https://x.com/cexplorer_io' target='_blank'>
                  <img src={TwitterLogo} alt='Twitter' width={30} />
                </a>
                <a href='https://discord.gg/PGCmmQC3dj ' target='_blank'>
                  <img src={DiscordLogo} alt='Discord' width={30} />
                </a>
                <a href='https://t.me/cexplorer' target='_blank'>
                  <img src={TelegramLogo} alt='Telegram' width={30} />
                </a>
                <a
                  href='https://github.com/vellum-labs/cexplorer-fe'
                  target='_blank'
                >
                  <img src={GithubLogo} alt='Github' width={30} />
                </a>
              </div>
            </div>
            <div className='mt-3 flex w-full justify-start gap-[10%] md:mt-0 md:justify-end'>
              <LinksColumn header='Links' links={footerLinks.links} />
              <LinksColumn header='Support us' links={footerLinks.supportUs} />
            </div>
          </section>
        </div>
      </div>
      <section className='flex w-full flex-col items-center bg-darker'>
        <div className='flex h-auto w-full max-w-desktop items-center justify-between gap-3 p-mobile md:h-[60px] md:px-desktop md:py-mobile'>
          <span className='md:text-sm text-text-sm text-grayTextPrimary'>
            Copyright © 2019-{new Date().getFullYear()} Mini Cexplorer. All
            rights reserved.
          </span>
          <span className='md:text-sm flex items-center text-text-sm text-grayTextPrimary'>
            Donations
            <span className='ml-1/2 text-primary underline'>
              {formatString(donationAddress, "short")}
            </span>{" "}
            <Copy copyText={donationAddress} className='mx-1/2' />
            ❤️
          </span>
        </div>
      </section>
    </footer>
  );
};
