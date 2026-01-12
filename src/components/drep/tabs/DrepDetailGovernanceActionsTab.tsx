import type { FC } from "react";
import { ActionTypes } from "@vellumlabs/cexplorer-sdk";
import { DateCell } from "@vellumlabs/cexplorer-sdk";
import { GlobalTable } from "@vellumlabs/cexplorer-sdk";
import { getRouteApi, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk";

export const DrepDetailGovernanceActionsTab: FC = () => {
  const route = getRouteApi("/drep/$hash");
  const { hash } = route.useParams();
  const { page } = useSearch({ from: "/drep/$hash" });
  const [totalItems, setTotalItems] = useState<number>(0);

  const governanceActionsQuery = { data: { pages: [] }, isLoading: false };

  const columns = [
    {
      key: "date",
      render: (item: any) => {
        if (!item?.tx?.time) {
          return "-";
        }
        return <DateCell time={item.tx.time} />;
      },
      title: <p>Date</p>,
      visible: true,
      widthPx: 50,
    },
    {
      key: "type",
      render: (item: any) => {
        if (!item?.proposal?.type) {
          return "-";
        }
        return <>{<ActionTypes title={item?.proposal?.type as ActionTypes} />}</>;
      },
      title: <p>Type</p>,
      visible: true,
      widthPx: 60,
    },
    {
      key: "governance_action_name",
      render: (item: any) => {
        const id = item?.proposal?.ident?.id;
        const name = item?.proposal?.anchor?.offchain?.name ?? "Invalid metadata";
        if (!id) return "-";
        return <div className='text-primary'>{name}</div>;
      },
      title: <p>Governance action</p>,
      visible: true,
      widthPx: 200,
    },
    {
      key: "vote",
      title: <p>Vote</p>,
      render: (item: any) => {
        if (!item?.vote) {
          return "-";
        }
        return <span>{item.vote}</span>;
      },
      visible: true,
      widthPx: 60,
    },
    {
      key: "voting_power",
      render: (item: any) => (
        <p className='text-right'>
          {item.info?.power === null ? "N/A" : <AdaWithTooltip data={item.info?.power?.stake || 0} />}
        </p>
      ),
      title: <p className='w-full text-right'>Voting Power</p>,
      visible: true,
      widthPx: 40,
    },
    {
      key: "tx",
      render: (item: any) => {
        if (!item?.tx?.hash) {
          return "-";
        }
        return <span className='text-primary'>{item?.tx?.hash}</span>;
      },
      title: <p>Tx</p>,
      visible: true,
      widthPx: 60,
    },
  ];

  return (
    <GlobalTable
      type='infinite'
      currentPage={page ?? 1}
      totalItems={totalItems}
      itemsPerPage={10}
      scrollable
      query={governanceActionsQuery}
      minContentWidth={1200}
      items={[]}
      columns={columns}
      onOrderChange={() => {}}
    />
  );
};
