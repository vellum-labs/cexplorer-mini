import type { FC } from "react";

import { TableList } from "@/components/global/TableList";
import {
  ActionTypes,
  AdaWithTooltip,
  Copy,
  DateCell,
  formatString,
  VoteBadge,
} from "@vellumlabs/cexplorer-sdk";
import { HashCell } from "@/components/tx/HashCell";

export const VotesTab: FC = () => {
  const columns = [
    {
      key: "date",
      render: () => {
        return <DateCell time='2026-01-04T21:44:52' />;
      },
      title: <p>Date</p>,
      widthPx: 50,
    },
    {
      key: "type",
      render: () => {
        return <ActionTypes title='InfoAction' />;
      },
      title: <p>Type</p>,
      widthPx: 60,
    },
    {
      key: "governance_action_name",
      render: () => {
        const name = "⚠️ Invalid metadata";

        return (
          <div className='flex items-center gap-1/2'>
            <span
              className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                name ? "text-text-xs" : "text-text-sm"
              } text-grayText`}
            >
              {formatString(name, "long")}
            </span>
            <Copy
              copyText={name}
              size={name ? 10 : 13}
              className='stroke-grayText'
            />
          </div>
        );
      },
      title: <p>Governance action</p>,
      widthPx: 200,
    },
    {
      key: "vote",
      title: <p>Vote</p>,
      render: () => {
        return <VoteBadge vote='Yes' />;
      },
      widthPx: 60,
    },
    {
      key: "voting_power",
      render: () => (
        <p className='text-right'>
          <AdaWithTooltip data={67000000} />
        </p>
      ),
      title: <p className='w-full text-right'>Voting Power</p>,
      widthPx: 40,
    },
    {
      key: "tx",
      render: () => {
        return (
          <HashCell hash='gov_action1q0m8z7glm9cprucwf44hdjdfra8khnakpm3hu5ueh929hvljw4aq66vt7l' />
        );
      },
      title: <p>Tx</p>,
      widthPx: 60,
    },
  ];

  return (
    <TableList
      columns={columns}
      storeKey='drep_detail_votes_tab'
      items={Array.from({ length: 20 }, () => ({ todo: true }))}
    />
  );
};
