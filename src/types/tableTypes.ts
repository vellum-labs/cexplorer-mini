export type TableOptionsCore<T> = {
  columnsVisibility: T;
  isResponsive: boolean;
  rows: number;
  columnsOrder: (keyof T)[];
};

export interface TxListTableColumns {
  date: boolean;
  hash: boolean;
  block: boolean;
  total_output: boolean;
  fee: boolean;
  size: boolean;
}
export interface TxListTableOptions
  extends Pick<TableOptionsCore<TxListTableColumns>, "isResponsive" | "rows"> {
  columnsVisibility: TxListTableColumns;
  columnsOrder: (keyof TxListTableColumns)[];
}

export interface EpochListColumns {
  epoch: boolean;
  start_time: boolean;
  end_time: boolean;
  stake: boolean;
  blocks: boolean;
  txs: boolean;
  output: boolean;
  fees: boolean;
  rewards: boolean;
}

export interface EpochTableOptions
  extends Pick<TableOptionsCore<EpochListColumns>, "isResponsive" | "rows"> {
  columnsVisibility: EpochListColumns;
  columnsOrder: (keyof EpochListColumns)[];
}

export type BlockListColumns = {
  date: boolean;
  hash: boolean;
  minted_by: boolean;
  block_no: boolean;
  epoch_no: boolean;
  slot_no: boolean;
  tx_count: boolean;
  epoch_slot_no: boolean;
  size: boolean;
};
