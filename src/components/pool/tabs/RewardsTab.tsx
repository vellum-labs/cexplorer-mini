import type { FC } from "react";

import {
  AdaWithTooltip,
  EpochCell,
  formatNumber,
  Tooltip,
} from "@vellumlabs/cexplorer-sdk";

import { Network, Users } from "lucide-react";
import { TableList } from "@/components/global/TableList";

export const RewardsTab: FC = () => {
  const columns = [
    {
      key: "epoch",
      render: () => (
        <EpochCell no={601} showPulseDot currentEpoch={601} justify='start' />
      ),
      title: <p className='w-full'>Epoch</p>,

      widthPx: 40,
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

      widthPx: 30,
    },
    {
      key: "luck",
      render: () => <div className='text-right'>{(45).toFixed(2)}%</div>,
      title: <p className='w-full text-right'>Luck</p>,

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

      widthPx: 55,
    },
    {
      key: "delegators",
      title: <p className='w-full text-right'>Delegators</p>,
      render: () => <div className='text-right'>456</div>,

      widthPx: 35,
    },
  ];

  return (
    <TableList
      columns={columns}
      storeKey='pool_detail_rewards_tab'
      items={Array.from({ length: 20 }, () => ({ rodo: true }))}
    />
  );
};
