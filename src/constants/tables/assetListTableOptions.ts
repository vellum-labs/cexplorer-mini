import type { AssetListTableOptions } from "@/types/tableTypes";

interface AssetListOptions {
  key: keyof AssetListTableOptions["columnsVisibility"];
  name: string;
}

export const assetListTableOptions: AssetListOptions[] = [
  {
    key: "type",
    name: "Type",
  },
  {
    key: "asset",
    name: "Asset",
  },
  {
    key: "policy_id",
    name: "Policy ID",
  },
  {
    key: "supply",
    name: "Supply",
  },
  {
    key: "minted",
    name: "Minted",
  },
];
