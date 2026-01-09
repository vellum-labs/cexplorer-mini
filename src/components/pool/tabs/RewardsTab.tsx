import type { FC } from "react";

import {
  AdaWithTooltip,
  EpochCell,
  formatNumber,
  GlobalTable,
  TableSettingsDropdown,
  Tooltip,
} from "@vellumlabs/cexplorer-sdk";

import { usePoolRewardsTableStore } from "@/stores/tables/poolRewardsTableStore";
import { Network, Users } from "lucide-react";
import { poolRewardsTableOptions } from "@/constants/tables/poolRewardsTableOptions";
import type { PoolRewardsColumns } from "@/types/tableTypes";

export const RewardsTab: FC = () => {
  const {
    columnsVisibility,
    columnsOrder,
    setColumsOrder,
    setColumnVisibility,
    rows,
    setRows,
  } = usePoolRewardsTableStore();

  const columns = [
    {
      key: "epoch",
      render: item => (
        <EpochCell no={item.no} showPulseDot currentEpoch={601} />
      ),
      title: <p className='w-full text-right'>Epoch</p>,
      visible: columnsVisibility.epoch,
      widthPx: 30,
    },
    {
      key: "rewards",
      render: () => (
        <div className='flex flex-col items-end gap-1/2'>
          <p className='flex items-center gap-1/2'>
            <AdaWithTooltip data={654564566464} />
            <Tooltip content='Pool operator rewards'>
              <Network size={16} className='cursor-help' />
            </Tooltip>
          </p>
          <p className='flex items-center gap-1/2'>
            <AdaWithTooltip data={654564566464} />
            <Tooltip content='Delegator rewards'>
              <Users size={16} className='cursor-help' />
            </Tooltip>
          </p>
        </div>
      ),
      title: <p className='w-full text-right'>Rewards</p>,
      visible: columnsVisibility.rewards,
      widthPx: 50,
    },
    {
      key: "active_stake",
      render: () => {
        return (
          <div className='flex w-full flex-col items-end gap-1/2'>
            <p className='text-grayTextPrimary'>
              <AdaWithTooltip data={56212331312} />
            </p>
          </div>
        );
      },
      title: <p className='w-full text-right'>Active Stake</p>,
      visible: columnsVisibility.active_stake,
      widthPx: 50,
    },
    {
      key: "epoch_stake",
      render: () => {
        return (
          <div className='flex flex-col items-end gap-1/2'>
            <p className='text-right text-grayTextPrimary'>
              <AdaWithTooltip data={54646545646} />
            </p>
          </div>
        );
      },
      title: <p className='w-full text-right'>Epoch Stake</p>,
      visible: columnsVisibility.epoch_stake,
      widthPx: 50,
    },
    {
      key: "roa",
      render: () => <div className='text-right'>{(45).toFixed(2) + "%"}</div>,
      title: (
        <div className='flex w-full justify-end'>
          <Tooltip
            content={
              <div style={{ width: "150px" }}>
                ROA: Return on ADA — annualized return percentage for delegators
              </div>
            }
          >
            <span className='cursor-help'>ROA</span>
          </Tooltip>
        </div>
      ),
      visible: columnsVisibility.roa,
      widthPx: 30,
    },
    {
      key: "luck",
      render: () => <div className='text-right'>{(45).toFixed(2)}%</div>,
      title: <p className='w-full text-right'>Luck</p>,
      visible: columnsVisibility.luck,
      widthPx: 30,
    },
    {
      key: "blocks",
      title: <p className='w-full text-right'>Blocks</p>,
      render: () => (
        <div className='text-right'>
          {`${formatNumber(1212)} / ${formatNumber(151515)}`}
        </div>
      ),
      visible: columnsVisibility.blocks,
      widthPx: 55,
    },
    {
      key: "delegators",
      title: <p className='w-full text-right'>Delegators</p>,
      render: () => <div className='text-right'>456</div>,
      visible: columnsVisibility.delegators,
      widthPx: 35,
    },
  ];

  return (
    <div>
      <h2 className='mb-1'>Rewards</h2>
      <div className='flex flex-col items-end gap-2'>
        <div className='flex items-center gap-1'>
          <TableSettingsDropdown
            rows={rows}
            setRows={setRows}
            columnsOptions={poolRewardsTableOptions.map(item => {
              return {
                label: item.name,
                isVisible: columnsVisibility[item.key],
                onClick: () =>
                  setColumnVisibility(item.key, !columnsVisibility[item.key]),
              };
            })}
          />
        </div>
        <GlobalTable
          type='infinite'
          currentPage={1}
          totalItems={20}
          itemsPerPage={rows}
          rowHeight={69}
          scrollable
          query={
            {
              isLoading: false,

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
          items={[]}
          columns={columns.sort((a, b) => {
            return (
              columnsOrder.indexOf(a.key as keyof PoolRewardsColumns) -
              columnsOrder.indexOf(b.key as keyof PoolRewardsColumns)
            );
          })}
          onOrderChange={setColumsOrder}
        />
      </div>
    </div>
  );
};
