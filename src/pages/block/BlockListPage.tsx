import type { FC } from "react";
import type { BlockListColumns } from "@/types/tableTypes";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";
import {
  BlockCell,
  DateCell,
  EpochCell,
  formatNumber,
  PoolCell,
  SizeCell,
} from "@vellumlabs/cexplorer-sdk";
import { HashCell } from "@/components/tx/HashCell";

import { blocksListTableOptions } from "@/constants/tables/blocksListTableOptions";

import { useBlockListTableStore } from "@/stores/tables/blockListTableStore";

export const BlockListPage: FC = () => {
  const {
    columnsOrder,
    columnsVisibility,
    rows,
    setColumnVisibility,
    setColumsOrder,
    setRows,
  } = useBlockListTableStore();

  const items = Array.from({ length: 20 }, () => ({
    hash: "68b0b8cb8e58970b8074b3ff3ff505351c3f0ea6eac14ec6bc8b99b671d874b4",
    pool: {
      id: "pool1c3fjkls7d2aujud8y5xy5e0azu0ueatwn34u7jy3ql85ze3xya8",
      meta: {
        name: "Cardano Yoda Pool",
        ticker: "MANDA",
        extended: {
          github_handle: "",
          twitch_handle: "",
          discord_handle: "",
          twitter_handle: "JaromirTesar",
          youtube_handle: "",
          facebook_handle: "",
          telegram_handle: 441437447,
        },
        homepage: "https://cardanoyoda.com",
        description: "MANDA Pool is operated by Cardano Yoda",
      },
    },
    size: 16104,
    time: "2026-01-05 05:20:24",
    slot_no: 176024133,
    vrf_key:
      "vrf_vk1vr5z2rhw9p0wz2c8kfgmydtzufkg9q9aykmlp9a6rgxuw032lehsatxhf6",
    block_no: 12868135,
    epoch_no: 605,
    tx_count: 9,
    epoch_param: {
      max_block_size: 90112,
      protocol_major: 10,
      protocol_minor: 0,
      max_block_ex_mem: 62000000,
      max_block_ex_steps: 20000000000,
    },
    proto_major: 10,
    proto_minor: 6,
    epoch_slot_no: 27333,
    op_cert_counter: 2,
  }));

  const columns = [
    {
      key: "date",
      render: item => <DateCell time={item.time} className='text-nowrap' />,
      title: "Date",
      visible: columnsVisibility.date,
      widthPx: 75,
    },
    {
      key: "block_no",
      render: item => <BlockCell hash={item.hash} no={item.block_no} />,
      title: <p className='w-full text-right'>Height</p>,
      visible: columnsVisibility.block_no,
      widthPx: 75,
    },
    {
      key: "hash",
      render: item => (
        <HashCell
          hash={item.hash}
          enableHover={false}
          formatType='short'
          href='/block'
        />
      ),
      title: <p className='w-full text-left'>Hash</p>,
      visible: columnsVisibility.hash,
      widthPx: 75,
    },
    {
      key: "epoch_no",
      render: item => <EpochCell no={item.epoch_no} />,
      title: <p className='w-full text-right'>Epoch</p>,
      visible: columnsVisibility.epoch_no,
      widthPx: 70,
    },
    {
      key: "slot_no",
      render: item => (
        <p className='text-right'>{formatNumber(item?.slot_no ?? 0)}</p>
      ),
      title: <p className='w-full text-right'>Slot</p>,
      visible: columnsVisibility.slot_no,
      widthPx: 80,
    },
    {
      key: "minted_by",
      render: item => {
        if (item.epoch_no === null) {
          return <span>Genesis block</span>;
        }
        return <PoolCell key={String(item.slot_no)} poolInfo={item.pool} />;
      },
      title: <p>Minted by</p>,
      visible: columnsVisibility.minted_by,
      widthPx: 140,
    },
    {
      key: "size",
      title: <p>Size</p>,
      render: item => (
        <div className='text-right'>
          {
            <SizeCell
              maxSize={item.epoch_param?.max_block_size ?? 0}
              size={item.size}
            />
          }
        </div>
      ),
      visible: columnsVisibility.size,
      widthPx: 90,
    },
    {
      key: "tx_count",
      render: item => <p className='text-right'>{item.tx_count}</p>,
      title: <p className='w-full text-right'>TXs</p>,
      visible: columnsVisibility.tx_count,
      widthPx: 50,
    },
  ];

  return (
    <PageBase
      metadataTitle='blockList'
      title='Blocks'
      breadcrumbItems={[{ label: "Blocks" }]}
    >
      <TableList
        title='All epochs'
        rows={rows}
        columns={columns.sort((a, b) => {
          return (
            columnsOrder.indexOf(a.key as keyof BlockListColumns) -
            columnsOrder.indexOf(b.key as keyof BlockListColumns)
          );
        })}
        columnsOptions={blocksListTableOptions.map(item => {
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
