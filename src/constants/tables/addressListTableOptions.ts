import type { AddressListTableOptions } from "@/types/tableTypes";

interface AddressListOptions {
  key: keyof AddressListTableOptions["columnsVisibility"];
  name: string;
}

export const addressListTableOptions: AddressListOptions[] = [
  {
    key: "account",
    name: "Account",
  },
  {
    key: "live_stake",
    name: "Live Stake",
  },
  {
    key: "pool_delegation",
    name: "Pool Delegation",
  },
  {
    key: "drep_delegation",
    name: "DRep Delegation",
  },
];
