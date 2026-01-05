import type { TableOptionsCore, TxListTableColumns } from "@/types/tableTypes";

interface TxListOptions {
  key: keyof TableOptionsCore<TxListTableColumns>["columnsVisibility"];
  name: string;
}

export const txListTableOptions: TxListOptions[] = [
  {
    key: "date",
    name: "Date",
  },
  {
    key: "hash",
    name: "Hash",
  },
  {
    key: "block",
    name: "Block",
  },
  {
    key: "total_output",
    name: "Total Output",
  },
  {
    key: "size",
    name: "Size",
  },
  {
    key: "fee",
    name: "Fee",
  },
];
