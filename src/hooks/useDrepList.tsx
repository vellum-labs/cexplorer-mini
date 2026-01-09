import type { Column } from "@/components/global/TableList";

import { DrepNameCell } from "@/components/drep/DrepNameCell";
import { MetadataCell } from "@/components/global/MetadataCell";
import {
  AdaWithTooltip,
  DateCell,
  formatNumber,
  PulseDot,
} from "@vellumlabs/cexplorer-sdk";

interface UseDrepListReturn {
  items: Record<string, unknown>[];
  columns: Column<Record<string, unknown>>[];
}

export const useDrepList = (): UseDrepListReturn => {
  const items = Array.from({ length: 20 }, () => ({
    data: {
      url: "https://raw.githubusercontent.com/Emurgo/constitution-committee/11af02e3b66daa7106941a1b3000d9721862bc3c/YOROI.jsonld",
      image_url:
        "https://raw.githubusercontent.com/Emurgo/constitution-committee/main/yoroi.png",
      given_name: "Yoroi W₳llet",
      objectives:
        "The Cardano blockchain has transitioned into a fully decentralized and distributed network that is governed by its community of users, developers, and other stakeholders.",
      payment_address: null,
    },
    hash: {
      raw: "0655f3a1c76788d839212adc459b188b84e680f30ae944c593fa18ae",
      view: "drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j",
      legacy: "drep1qe2l8gw8v7ydswfp9twytxcc3wzwdq8npt55f3vnlgv2u8sx3nt",
      has_script: false,
    },
    stat: {
      total: {
        votes: [
          {
            vote: "Yes",
            count: 56,
          },
          {
            vote: "No",
            count: 9,
          },
          {
            vote: "Abstain",
            count: 5,
          },
        ],
        recently: "TBD",
        opportunity: 72,
      },
    },
    distr: {
      count: 20488,
      amount: 636607304833918,
      active_until: 623,
    },
    owner: {
      stake: "stake1u9d6g93fd4t9zqu39q8cr82nh27da3unq65xlq6axglqrlgw7tf77",
      address:
        "addr1qxxj0zec9lth7hje8prg39r3x746g690qzuvxkgrk67q9w6m5stzjm2k2ypez2q0sxw48w4ummrexp4gd7p46v37q87s0rvfsp",
      balance: 5041903,
    },
    since: "2025-03-06 09:30:50",
    amount: 636607304833918,
    votestat: {
      rate: {
        total: 0.9444444444444444,
        recent: 0.9516129032258065,
      },
      stat: {
        total: {
          gov_votes: 68,
          gov_actions: 72,
        },
        recent: {
          gov_votes: 59,
          gov_actions: 62,
        },
      },
      recent_vote: "2025-12-29T07:55:44",
    },
    is_active: true,
    top_delegator: {
      view: "stake1u9h92w2kl88gdvp9vujdxhf0cwjzd9kwvly0zrjpttk97qc4utaja",
      stake: 20540682790112,
    },
  }));

  const columns = [
    {
      key: "status",
      render: item => {
        if (typeof item?.is_active === "undefined") {
          return "-";
        }

        return (
          <div className='relative flex h-[24px] w-fit items-center justify-end gap-1 rounded-m border border-border px-[10px]'>
            <PulseDot color={!item.is_active ? "bg-redText" : undefined} />
            <span className='text-text-xs font-medium'>
              {item.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
      title: <p>Status</p>,

      widthPx: 40,
    },
    {
      key: "drep_name",
      render: item => {
        if (!item?.hash?.view) {
          return "-";
        }

        return <DrepNameCell item={item} />;
      },
      title: <p>DRep name</p>,

      widthPx: 120,
    },
    {
      key: "voting_power",
      render: item => {
        if (!item?.amount) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            <AdaWithTooltip data={item.amount} />
          </p>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Voting power</span>
        </div>
      ),

      widthPx: 50,
    },
    {
      key: "registered",
      render: item => {
        if (!item?.since) {
          return "-";
        }

        return <DateCell time={item.since} />;
      },
      title: (
        <div className='flex w-fit cursor-pointer items-center gap-1/2 text-right'>
          <span>Registered</span>
        </div>
      ),

      widthPx: 60,
    },
    {
      key: "delegators",
      render: item => {
        return (
          <span className='flex justify-end'>
            {formatNumber(item.distr?.count)}
          </span>
        );
      },
      title: (
        <div className='flex w-full justify-end'>
          <span>Delegators</span>
        </div>
      ),

      widthPx: 45,
    },
    {
      key: "metadata",
      render: item => {
        if (!item?.data) {
          return <p className='text-right'>-</p>;
        }

        return <MetadataCell metadata={item.data} />;
      },
      title: <p className='w-full text-right'>DRep metadata</p>,

      widthPx: 50,
    },
  ];

  return {
    items,
    columns: columns.map(item => ({ ...item, visible: true })),
  };
};
