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

export interface PoolsListColumns {
  pool: boolean;
  stake: boolean;
  blocks: boolean;
  fees: boolean;
  pledge: boolean;
  luck: boolean;
  rewards: boolean;
  delegators: boolean;
}

export interface PoolsListTableOptions
  extends Pick<TableOptionsCore<PoolsListColumns>, "isResponsive" | "rows"> {
  columnsVisibility: PoolsListColumns;
  columnsOrder: (keyof PoolsListColumns)[];
}

export interface DrepListTableColumns {
  status: boolean;
  drep_name: boolean;
  voting_power: boolean;
  registered: boolean;
  metadata: boolean;
  delegators: boolean;
}

export interface DrepListTableOptions
  extends Pick<
    TableOptionsCore<DrepListTableColumns>,
    "isResponsive" | "rows"
  > {
  columnsVisibility: DrepListTableColumns;
  columnsOrder: (keyof DrepListTableColumns)[];
}

export interface AssetListTableColumns {
  type: boolean;
  asset: boolean;
  policy_id: boolean;
  supply: boolean;
  minted: boolean;
}

export interface AssetListTableOptions
  extends Pick<
    TableOptionsCore<AssetListTableColumns>,
    "isResponsive" | "rows"
  > {
  columnsVisibility: AssetListTableColumns;
  columnsOrder: (keyof AssetListTableColumns)[];
}

export interface AddressListTableColumns {
  account: boolean;
  live_stake: boolean;
  pool_delegation: boolean;
  drep_delegation: boolean;
}

export interface AddressListTableOptions
  extends Pick<
    TableOptionsCore<AddressListTableColumns>,
    "isResponsive" | "rows"
  > {
  columnsVisibility: AddressListTableColumns;
  columnsOrder: (keyof AddressListTableColumns)[];
}
