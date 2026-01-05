import type { FC } from "react";
import type { EpochListColumns } from "@/types/tableTypes";

import {
  AdaWithTooltip,
  convertUtcToLocal,
  DateCell,
  EpochCell,
  formatNumber,
  lovelaceToAda,
} from "@vellumlabs/cexplorer-sdk";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { useEpochListTableStore } from "@/stores/tables/epochListTableStore";
import { epochListTableOptions } from "@/constants/tables/epochListTableOptions";
import { format } from "date-fns";

export const EpochListPage: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useEpochListTableStore();

  const items = Array.from({ length: 20 }, () => ({
    no: 456,
    fees: 3155682484,
    stats: {
      epoch: {
        block_size: 12865956,
        block_count: 1220,
      },
      stake: {
        epoch: 21393258962888844,
        active: 21475204604420372,
        accounts: 1343325,
      },
      rewards: {
        leader: null,
        member: null,
      },
      pool_stat: {
        pct_member: null,
      },
    },
    params: [
      {
        nonce:
          "493c1a18e97b08a8fcbd3f4a98a837f4e24d9a516643f626e9fe20946b65dc0a",
        epoch_no: 605,
        influence: 0.3,
        max_epoch: 18,
        min_fee_a: 44,
        min_fee_b: 155381,
        price_mem: 0.0577,
        price_step: 0.0000721,
        key_deposit: 2000000,
        max_bh_size: 1100,
        max_tx_size: 16384,
        max_val_size: 5000,
        pool_deposit: 500000000,
        drep_activity: 20,
        extra_entropy: null,
        max_tx_ex_mem: 14000000,
        min_pool_cost: 170000000,
        max_block_size: 90112,
        min_utxo_value: 0,
        protocol_major: 10,
        protocol_minor: 0,
        max_tx_ex_steps: 10000000000,
        decentralisation: 0,
        max_block_ex_mem: 62000000,
        dvt_p_p_gov_group: 0.75,
        collateral_percent: 150,
        committee_min_size: 7,
        max_block_ex_steps: 20000000000,
        optimal_pool_count: 500,
        coins_per_utxo_size: 4310,
        gov_action_lifetime: 6,
        dvt_committee_normal: 0.67,
        monetary_expand_rate: 0.003,
        pvt_committee_normal: 0.51,
        pvtpp_security_group: 0.51,
        treasury_growth_rate: 0.2,
        dvt_p_p_network_group: 0.67,
        max_collateral_inputs: 3,
        dvt_p_p_economic_group: 0.67,
        dvt_p_p_technical_group: 0.67,
        dvt_treasury_withdrawal: 0.67,
        dvt_hard_fork_initiation: 0.6,
        dvt_motion_no_confidence: 0.67,
        pvt_hard_fork_initiation: 0.51,
        pvt_motion_no_confidence: 0.51,
        committee_max_term_length: 146,
        dvt_update_to_constitution: 0.75,
        dvt_committee_no_confidence: 0.6,
        pvt_committee_no_confidence: 0.51,
        min_fee_ref_script_cost_per_byte: 15,
      },
    ],
    out_sum: 3600807379818238,
    end_time: "2026-01-05 04:46:24",
    tx_count: 9632,
    blk_count: 1226,
    start_time: "2026-01-04 21:44:52",
  }));

  const columns = [
    {
      key: "epoch",
      render: item => {
        const epochNo = item.no;
        return (
          <EpochCell
            no={epochNo}
            showPulseDot
            currentEpoch={600}
            justify='start'
          />
        );
      },
      title: <p>Epoch</p>,
      visible: columnsVisibility.epoch,
      widthPx: 50,
    },
    {
      key: "start_time",
      render: item => {
        const localDate = convertUtcToLocal(item?.start_time);
        const dateFromDataTime = new Date(localDate.replace(" ", "T"));

        return (
          <div className='flex flex-col'>
            <span> {format(dateFromDataTime, "dd.MM.yyyy")}</span>
            <DateCell
              time={item?.start_time}
              className='text-text-xs text-grayTextPrimary'
            />
          </div>
        );
      },
      title: "Start Time",
      visible: columnsVisibility.start_time,
      widthPx: 90,
    },
    {
      key: "end_time",
      render: item => {
        const localDate = convertUtcToLocal(item?.end_time);
        const dateFromDataTime = new Date(localDate.replace(" ", "T"));

        return (
          <div className='flex flex-col'>
            <span> {format(dateFromDataTime, "dd.MM.yyyy")}</span>
            <DateCell
              time={item?.end_time}
              className='text-text-xs text-grayTextPrimary'
            />
          </div>
        );
      },
      title: "End Time",
      visible: columnsVisibility.end_time,
      widthPx: 90,
    },
    {
      key: "stake",
      render: item => {
        const stakeEpoch = item.stats?.stake?.epoch ?? 0;
        return (
          <p
            title={lovelaceToAda(stakeEpoch)}
            className='text-nowrap text-right'
          >
            <AdaWithTooltip data={stakeEpoch} />
          </p>
        );
      },
      title: <p className='w-full text-right'>Stake</p>,
      visible: columnsVisibility.stake,
      widthPx: 50,
    },
    {
      key: "rewards",
      render: item => {
        const leaderReward = item.stats?.rewards?.leader ?? 0;

        return (
          <div className='text-right'>
            <AdaWithTooltip data={leaderReward} />
          </div>
        );
      },
      title: <p className='w-full text-right'>Rewards</p>,
      visible: columnsVisibility.rewards,
      widthPx: 50,
    },
    {
      key: "block",
      render: item => (
        <p
          title={item?.stats?.epoch?.block_count ?? item?.blk_count}
          className='text-right'
        >
          {formatNumber(item?.stats?.epoch?.block_count ?? item?.blk_count)}
        </p>
      ),
      title: <p className='w-full text-right'>Blocks</p>,
      visible: columnsVisibility.blocks,
      widthPx: 50,
    },
    {
      key: "txs",
      render: item => (
        <p title={item?.tx_count} className='text-right'>
          {formatNumber(item?.tx_count)}
        </p>
      ),
      title: <p className='w-full text-right'>TXs</p>,
      visible: columnsVisibility.txs,
      widthPx: 50,
    },
    {
      key: "outsum",
      render: item => (
        <p title={item?.out_sum} className='text-right'>
          <AdaWithTooltip data={item?.out_sum} />
        </p>
      ),
      title: <p className='w-full text-right'>Output</p>,
      visible: columnsVisibility.output,
      widthPx: 55,
    },
    {
      key: "fees",
      render: item => {
        const feesperTx = lovelaceToAda(
          isNaN(item?.fees / item.tx_count) ? 0 : item?.fees / item.tx_count,
        );

        return (
          <div title={item?.fees} className='flex flex-col'>
            <span>
              <AdaWithTooltip data={item?.fees ?? 0} />
            </span>
            <span>{feesperTx}/tx</span>
          </div>
        );
      },
      jsonFormat: item => {
        if (!item?.fees) {
          return "-";
        }

        const fees = lovelaceToAda(item?.fees);
        const feesperTx = lovelaceToAda(
          isNaN(item?.fees / item.tx_count) ? 0 : item?.fees / item.tx_count,
        );

        return `${fees}, ${feesperTx} per TX`;
      },
      title: "Fees",
      visible: columnsVisibility.fees,
      widthPx: 50,
    },
  ];

  return (
    <PageBase
      metadataTitle='epochsList'
      title='Epochs'
      breadcrumbItems={[{ label: "Epochs" }]}
    >
      <TableList
        title='All epochs'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof EpochListColumns) -
            columnsOrder.indexOf(b.key as keyof EpochListColumns)
          );
        })}
        columnsOptions={epochListTableOptions.map(item => {
          return {
            label: item.name,
            isVisible: columnsVisibility[item.key],
            onClick: () =>
              setColumnVisibility(item.key, !columnsVisibility[item.key]),
          };
        })}
        items={items}
        setColumsOrder={setColumsOrder}
        setRows={setRows}
      />
    </PageBase>
  );
};
