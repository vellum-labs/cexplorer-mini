import { TableList } from "@/components/global/TableList";
import { HashCell } from "@/components/tx/HashCell";
import { Link } from "@tanstack/react-router";
import {
  AdaWithTooltip,
  Copy,
  DateCell,
  EpochCell,
  formatString,
  Tooltip,
} from "@vellumlabs/cexplorer-sdk";
import { Clock, Download } from "lucide-react";
import type { FC } from "react";

export const AboutTab: FC = () => {
  const ownerColumns = [
    {
      key: "address",
      render: () => {
        const view =
          "stake1u9zjr6e37w53a474puhx606ayr3rz2l6jljrmzvlzkk3cmg0m2zw0";

        const isStake = view.includes("stake");

        return isStake ? (
          <Link
            to='/stake/$stakeAddr'
            params={{ stakeAddr: view }}
            className='text-primary'
          >
            {formatString(view, "longer")}
          </Link>
        ) : (
          <Link
            to='/address/$address'
            params={{ address: view }}
            className='text-primary'
          >
            {formatString(view, "longer")}
          </Link>
        );
      },
      title: "Address",
      widthPx: 40,
    },
    {
      key: "active_stake",
      render: () => (
        <p className='text-right'>
          <AdaWithTooltip data={4565456465} />
        </p>
      ),
      title: <p className='w-full text-right'>Active Stake</p>,
      visible: true,
      widthPx: 20,
    },
    {
      key: "live_stake",
      render: () => (
        <p className='text-right'>
          <AdaWithTooltip data={4565456465} />
        </p>
      ),
      title: <p className='w-full text-right'>Live Stake</p>,
      visible: true,
      widthPx: 20,
    },
  ];

  const rewardsColumns = [
    {
      key: "address",
      render: () => {
        const view =
          "stake1u9zjr6e37w53a474puhx606ayr3rz2l6jljrmzvlzkk3cmg0m2zw0";

        const isStake = view.includes("stake");

        return isStake ? (
          <Link
            to='/stake/$stakeAddr'
            params={{ stakeAddr: view }}
            className='text-primary'
          >
            {formatString(view, "longer")}
          </Link>
        ) : (
          <Link
            to='/address/$address'
            params={{ address: view }}
            className='text-primary'
          >
            {formatString(view, "longer")}
          </Link>
        );
      },
      title: "Address",
      widthPx: 40,
    },
    {
      key: "active_stake",
      render: () => (
        <p className='text-right'>
          <AdaWithTooltip data={4565456465} />
        </p>
      ),
      title: <p className='w-full text-right'>Active Stake</p>,
      visible: true,
      widthPx: 20,
    },
    {
      key: "live_stake",
      render: () => (
        <p className='text-right'>
          <AdaWithTooltip data={4565456465} />
        </p>
      ),
      title: <p className='w-full text-right'>Live Stake</p>,
      visible: true,
      widthPx: 20,
    },
  ];

  const relayColumns = [
    {
      key: "address",
      render: () => {
        return <p>140.238.214.***</p>;
      },
      title: "Address",
      visible: true,
      widthPx: 150,
    },
    {
      key: "port",
      render: () => <p className='text-right'>***0</p>,
      title: <p className='w-full text-right'>Port</p>,
      visible: true,
      widthPx: 150,
    },
  ];

  const certificatesColumns = [
    {
      key: "date",
      render: () => {
        return (
          <div className='updateItems-center flex items-center gap-1/2'>
            <Clock size={10} color='grayText' />
            7.12.2023
          </div>
        );
      },
      title: "Date",
      visible: true,
      widthPx: 20,
    },
    {
      key: "active_in",
      render: () => <EpochCell no={601} />,
      title: <p className='w-full text-right'>Active in</p>,
      visible: true,
      widthPx: 20,
    },
    {
      key: "rewards_address",
      render: () => {
        const view =
          "stake1u9zjr6e37w53a474puhx606ayr3rz2l6jljrmzvlzkk3cmg0m2zw0";

        return (
          <Link
            className='text-primary'
            to='/stake/$stakeAddr'
            params={{
              stakeAddr: view,
            }}
          >
            {formatString(view, "longer")}
          </Link>
        );
      },
      title: <p>Rewards Address</p>,
      visible: true,
      widthPx: 50,
    },
    {
      key: "owner_address",
      render: () => {
        const view =
          "stake1u9zjr6e37w53a474puhx606ayr3rz2l6jljrmzvlzkk3cmg0m2zw0";

        return (
          <Link
            className='text-primary'
            to='/stake/$stakeAddr'
            params={{
              stakeAddr: view,
            }}
          >
            {formatString(view, "longer")}
          </Link>
        );
      },
      title: <p>Owner Address</p>,
      visible: true,
      widthPx: 50,
    },
    {
      key: "params",
      render: () => {
        return (
          <div className='flex flex-col'>
            <span>
              Pledge: <AdaWithTooltip data={456212} />
            </span>
            <span>
              Fixed Costs: <AdaWithTooltip data={170} />
            </span>
            <span>Margin: {(0.02 * 100).toFixed(2)}%</span>
          </div>
        );
      },
      title: <p>Params</p>,
      visible: true,
      widthPx: 50,
    },
    {
      key: "metadata",
      render: () => {
        const hash =
          "04ba91f1742c7b066677bc617eb1c3598e4d3bec7d21763f84364f4050019601";

        return (
          <div className='flex flex-col items-end'>
            <Tooltip content='https://cardanians.io/_storage/pool-crdn1.json'>
              <div className='flex w-fit cursor-pointer items-center justify-end gap-1/2'>
                <Download className='text-primary' size={11} />
                <span className='text-primary'>Download</span>
              </div>
            </Tooltip>
            <div className='flex items-center justify-end gap-1/2'>
              <span>{formatString(hash, "long")}</span>
              <Copy copyText={hash} className='translate-y-[1px]' size={11} />
            </div>
          </div>
        );
      },
      title: <p className='w-full text-right'>Metadata</p>,
      visible: true,
      widthPx: 50,
    },
  ];

  const retirmentColumns = [
    {
      key: "date",
      render: () => {
        return <DateCell time='2026-01-04T21:44:52' />;
      },
      title: "Date",
      visible: true,
      widthPx: 60,
    },
    {
      key: "tx",
      render: () => {
        return (
          <HashCell
            hash='ajksdjkasjkldlajksdjlkajklsdjklasdjklajklsdjklasdjklasdjklajklsdjklasdjklajkldkl'
            formatType='longer'
          />
        );
      },
      title: "Transaction ID",
      visible: true,
      widthPx: 180,
    },
    {
      key: "epoch",
      render: () => <EpochCell no={601} />,
      title: <p className='w-full text-end'>Retiring epoch</p>,
      visible: true,
      widthPx: 180,
    },
  ];

  return (
    <div className='flex flex-col gap-2'>
      <TableList
        columns={ownerColumns}
        title='Owners (Pledge)'
        withPadding={false}
        items={Array.from({ length: 3 }, () => ({ todo: true }))}
        tableType='default'
      />
      <TableList
        columns={rewardsColumns}
        title='Rewards'
        withPadding={false}
        items={Array.from({ length: 1 }, () => ({ todo: true }))}
        tableType='default'
      />
      <TableList
        columns={relayColumns}
        title='Relays'
        withPadding={false}
        items={Array.from({ length: 2 }, () => ({ todo: true }))}
        tableType='default'
      />
      <TableList
        columns={certificatesColumns}
        title='Pool certificates'
        withPadding={false}
        items={Array.from({ length: 7 }, () => ({ todo: true }))}
        tableType='default'
      />
      <TableList
        columns={retirmentColumns}
        title='Retirement'
        withPadding={false}
        items={Array.from({ length: 1 }, () => ({ todo: true }))}
        tableType='default'
      />
    </div>
  );
};
