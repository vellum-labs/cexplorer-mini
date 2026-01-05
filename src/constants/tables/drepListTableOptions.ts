import type { DrepListTableOptions } from "@/types/tableTypes";

interface DrepListOptions {
  key: keyof DrepListTableOptions["columnsVisibility"];
  name: string;
}

export const drepListTableOptions: DrepListOptions[] = [
  {
    key: "status",
    name: "Status",
  },
  {
    key: "drep_name",
    name: "DRep Name",
  },
  {
    key: "voting_power",
    name: "Voting Power",
  },
  {
    key: "registered",
    name: "Registered",
  },
  {
    key: "delegators",
    name: "Delegators",
  },
  {
    key: "metadata",
    name: "DRep metadata",
  },
];
