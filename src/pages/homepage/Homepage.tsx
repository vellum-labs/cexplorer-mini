import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { HomepageWidget } from "@/components/homepage/HomepageWidget";

import { useBlockList } from "@/hooks/useBlockList";
import { useTxList } from "@/hooks/useTxList";
import { useDrepList } from "@/hooks/useDrepList";

export const Homepage: FC = () => {
  const [
    { columns: blockColumns, items: blockItems },
    { columns: txColumns, items: txItems },
    { columns: drepColumns, items: drepItems },
  ] = [useBlockList(), useTxList(), useDrepList()];

  const widgets = [
    {
      title: "Recent blocks",
      linkTitle: "All blocks",
      link: "/block",
      columns: blockColumns.filter(item =>
        ["date", "block_no", "tx_count", "minted_by"].includes(item.key),
      ),
      items: blockItems,
    },
    {
      title: "Recent transactions",
      linkTitle: "All tx",
      link: "/tx",
      columns: txColumns.filter(item =>
        ["date", "hash", "block", "fee"].includes(item.key),
      ),
      items: txItems,
    },
    {
      title: "DReps",
      linkTitle: "All DReps",
      link: "/drep",
      columns: drepColumns.filter(item =>
        ["drep_name", "voting_power", "registered"].includes(item.key),
      ),
      items: drepItems,
    },
  ] as const;

  return (
    <PageBase title='Explore Cardano blockchain' metadataTitle='homepage'>
      <main className='flex w-full max-w-desktop items-center px-mobile py-3 md:px-desktop'>
        <div className='flex flex-wrap gap-3'>
          {widgets.map(({ link, linkTitle, title, columns, items }) => (
            <HomepageWidget
              link={link}
              linkTitle={linkTitle}
              title={title}
              columns={columns}
              items={items}
            />
          ))}
        </div>
      </main>
    </PageBase>
  );
};
