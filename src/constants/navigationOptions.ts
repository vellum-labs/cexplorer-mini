import type { NavigationOptionType } from "@/types/navigationTypes";
import type { NavigationOptions } from "@vellumlabs/cexplorer-sdk";

export const navigationOptions: {
  [T in NavigationOptionType]: NavigationOptions;
} = {
  blockchain: [
    {
      label: "Transactions",
      href: "/tx",
    },
    {
      label: "Blocks",
      href: "/block",
    },
    {
      label: "Epochs",
      href: "/epoch",
    },
  ],
  staking: [
    {
      label: "Stake pools",
      href: "/pool",
    },
  ],
  governance: [
    {
      label: "DReps",
      href: "/drep",
    },
  ],
  assets: [
    {
      label: "Assets",
      href: "/asset",
    },
  ],
  tools: [
    {
      label: "Addresses",
      href: "/address",
    },
  ],
};
