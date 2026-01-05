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
  ],
  staking: [],
  governance: [],
  assets: [],
  tools: [],
};
