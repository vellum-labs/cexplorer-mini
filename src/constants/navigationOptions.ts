import type { NavigationOptionType } from "@/types/navigationTypes";
import type { NavigationOptions } from "@vellumlabs/cexplorer-sdk/NavigationTypes";

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
