import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { HomepageWidget } from "@/components/homepage/HomepageWidget";

import { useBlockList } from "@/hooks/useBlockList";
import { useTxList } from "@/hooks/useTxList";

export const Homepage: FC = () => {
  const [
    { columns: blockColumns, items: blockItems },
    { columns: txColumns, items: txItems },
  ] = [useBlockList(), useTxList()];

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
  ] as const;

  return (
    <PageBase
      title='Explore Cardano blockchain'
      metadataTitle='homepage'
      isHomepage
    >
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
