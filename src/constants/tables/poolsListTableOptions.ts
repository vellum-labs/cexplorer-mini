import type { PoolsListTableOptions } from "@/types/tableTypes";

type PoolsListOptions = {
  key: keyof PoolsListTableOptions["columnsVisibility"];
  name: string;
}[];

export const poolsListTableOptions: PoolsListOptions = [
  {
    key: "pool",
    name: "Pool",
  },
  {
    key: "stake",
    name: "Stake",
  },
  {
    key: "rewards",
    name: "Rewards",
  },
  {
    key: "luck",
    name: "Luck",
  },
  {
    key: "fees",
    name: "Fees",
  },
  {
    key: "blocks",
    name: "Blocks",
  },
  {
    key: "pledge",
    name: "Pledge",
  },
  {
    key: "delegators",
    name: "Delegators",
  },
];
