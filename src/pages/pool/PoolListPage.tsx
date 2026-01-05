import type { FC } from "react";
import type { PoolsListColumns } from "@/types/tableTypes";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";

import { usePoolsListTableStore } from "@/stores/tables/poolsListTableStore";
import { poolsListTableOptions } from "@/constants/tables/poolsListTableOptions";
import {
  AdaWithTooltip,
  formatNumber,
  PoolCell,
} from "@vellumlabs/cexplorer-sdk";

export const PoolListPage: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = usePoolsListTableStore();

  const items = Array.from({ length: 20 }, () => ({
    stats: {
      recent: {
        roa: 244.47858639296467,
        luck: 1.5571966772813493,
        epochs: 10,
      },
      lifetime: {
        roa: 2.616920695488607,
        luck: 0.989031737563029,
        epochs: 187,
      },
    },
    blocks: {
      epoch: 0,
      total: 5623,
    },
    epochs: {
      "0": {
        no: 604,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.074062943772188,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 19033670244,
          delegators: 11,
          epoch_stake: 73311315209,
        },
      },
      "1": {
        no: 603,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.073737337440243,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 19033670244,
          delegators: 11,
          epoch_stake: 73311315209,
        },
      },
      "2": {
        no: 602,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.073495800406877,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 18713094731,
          delegators: 11,
          epoch_stake: 73311315209,
        },
      },
      "3": {
        no: 601,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.073875197445487,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 18713094731,
          delegators: 11,
          epoch_stake: 73311315209,
        },
      },
      "4": {
        no: 599,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.073396979524347,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 18713094731,
          delegators: 11,
          epoch_stake: 72990739696,
        },
      },
      "6": {
        no: 598,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.064570424068622,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 17833471122,
          delegators: 11,
          epoch_stake: 72990739696,
        },
      },
      "7": {
        no: 597,
        data: {
          block: {
            luck: 0,
            minted: 0,
            estimated: 0.054363031982557,
          },
          reward: {
            leader_pct: 0,
            member_pct: 0,
            leader_lovelace: 0,
            member_lovelace: 0,
          },
          pledged: 16913097568,
          delegators: 11,
          epoch_stake: 72990739696,
        },
      },
    },
    pledged: 19033670244,
    pool_id: "pool1lfsslc99da8jhj5apzctsnfm76kjc6ndyc6hnynagcj8xexvjsr",
    pool_name: {
      name: "Binance Node - 14",
      ticker: "BNP",
      extended: null,
      homepage: "https://www.binance.com/en/earn",
      description: "Binance Staking Pool",
    },
    delegators: 11,
    last_block: {
      proto: 10.6,
      slot_no: 174187606,
    },
    live_stake: 73310947991,
    saturation: 0.001,
    pool_retire: {
      live: {
        index: null,
        tx_id: null,
        retiring_epoch: null,
      },
      active: {
        index: null,
        tx_id: null,
        retiring_epoch: null,
      },
    },
    pool_update: {
      live: {
        tx: {
          id: 68048181,
          hash: "9394b0c12501866da6ef1b96e7a55ed743e415262e22d09536991367ca1a2783",
          time: "2023-06-02T18:23:34",
        },
        index: 0,
        owner: [
          {
            view: "stake1uxam8lqg53ufq045dcn4nduplalvsg0dufrq8d7kytt7clcl58vqf",
          },
        ],
        margin: 0.06,
        pledge: 2000000,
        meta_id: 31029,
        fixed_cost: 345000000,
        reward_addr:
          "stake1uxam8lqg53ufq045dcn4nduplalvsg0dufrq8d7kytt7clcl58vqf",
        active_epoch_no: 418,
      },
      active: {
        tx: {
          id: 68048181,
          hash: "9394b0c12501866da6ef1b96e7a55ed743e415262e22d09536991367ca1a2783",
          time: "2023-06-02T18:23:34",
        },
        index: 0,
        owner: [
          {
            view: "stake1uxam8lqg53ufq045dcn4nduplalvsg0dufrq8d7kytt7clcl58vqf",
          },
        ],
        margin: 0.06,
        pledge: 2000000,
        meta_id: 31029,
        fixed_cost: 345000000,
        reward_addr:
          "stake1uxam8lqg53ufq045dcn4nduplalvsg0dufrq8d7kytt7clcl58vqf",
        active_epoch_no: 418,
      },
    },
    active_stake: 73311315209,
    active_epochs: 190,
    top_delegator: {
      view: "stake1u8ugr9hex2qj4v5fe8k5rv3kxcs2whrpf6umf23wt3wxylgau9umc",
      stake: 24962238125,
    },
    pool_id_hash_raw:
      "fa610fe0a56f4f2bca9d08b0b84d3bf6ad2c6a6d263579927d462473",
  }));

  const columns = [
    {
      key: "pool",
      render: item => (
        <PoolCell
          poolInfo={{
            id: item.pool_id,
            meta: item.pool_name,
          }}
        />
      ),
      title: "Pool",
      visible: columnsVisibility.pool,
      widthPx: 150,
    },
    {
      key: "stake",
      render: item => {
        return (
          <div className='flex flex-col gap-1.5'>
            <span className='text-right text-grayTextPrimary'>
              <AdaWithTooltip data={item.active_stake} />
            </span>
          </div>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Stake</span>
        </div>
      ),
      visible: columnsVisibility.stake,
      widthPx: 60,
    },

    {
      key: "rewards",
      render: item => {
        return (
          <div className='flex w-full justify-end'>
            <p className='text-grayTextPrimary'>
              {item?.stats?.recent?.roa
                ? item.stats.recent.roa.toFixed(2)
                : (0).toFixed(2)}
              %
            </p>
          </div>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Rewards</span>
        </div>
      ),
      visible: columnsVisibility.rewards,
      widthPx: 80,
    },
    {
      key: "luck",
      render: item => (
        <p className='text-right text-grayTextPrimary'>
          {item?.stats?.lifetime?.luck * 100
            ? (item?.stats?.lifetime?.luck * 100).toFixed(2)
            : 0}
          %
        </p>
      ),
      title: (
        <div className='flex w-full justify-end'>
          <p className='text-right'>Luck</p>
        </div>
      ),
      visible: columnsVisibility.luck,
      widthPx: 50,
    },
    {
      key: "fees",
      render: item => (
        <div className='flex flex-col text-right text-text-xs text-grayTextPrimary'>
          <span>
            {item?.pool_update?.active?.margin
              ? (item.pool_update.active.margin * 100).toFixed(2)
              : 0}
            %
          </span>
          <AdaWithTooltip
            triggerClassName='text-text-xs'
            data={item?.pool_update?.active?.fixed_cost ?? 0}
          />
        </div>
      ),
      title: (
        <div className='flex w-full justify-end'>
          <p className='text-right'>Fees</p>
        </div>
      ),
      visible: columnsVisibility.fees,
      widthPx: 50,
    },
    {
      key: "blocks",
      render: item => {
        const formattedTotalBlocks = formatNumber(item?.blocks?.total);

        return (
          <div className='text-right text-grayTextPrimary'>
            <div className='flex items-center justify-end gap-1'>
              <span>{`400 / ${formatNumber(800)}`}</span>
            </div>
            <div className='text-text-xs text-grayTextSecondary'>
              ({formattedTotalBlocks})
            </div>
          </div>
        );
      },
      title: <span className='w-full text-right'>Blocks</span>,

      visible: columnsVisibility.blocks,
      widthPx: 100,
    },
    {
      key: "pledge",
      render: item => {
        return (
          <span className='w-[60px] whitespace-nowrap text-grayTextPrimary'>
            <AdaWithTooltip data={item.pool_update?.active?.pledge ?? 0} />
          </span>
        );
      },
      title: <span>Pledge</span>,

      visible: columnsVisibility.pledge,
      widthPx: 55,
    },

    {
      key: "delegators",
      render: item => {
        return <p className='text-right'>{item.delegators}</p>;
      },
      title: <p className='text-right'>Delegators</p>,

      visible: columnsVisibility.delegators,
      widthPx: 85,
    },
  ];

  return (
    <PageBase
      metadataTitle='poolList'
      title='Cardano Stake Pools'
      breadcrumbItems={[{ label: "Pools" }]}
    >
      <TableList
        title='All stake pools'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof PoolsListColumns) -
            columnsOrder.indexOf(b.key as keyof PoolsListColumns)
          );
        })}
        columnsOptions={poolsListTableOptions.map(item => {
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
