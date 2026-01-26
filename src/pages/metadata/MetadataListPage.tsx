import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";

import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { SizeCell } from "@vellumlabs/cexplorer-sdk/SizeCell";
import { MetadataCell } from "@/components/global/MetadataCell";

export const MetadataListPage: FC = () => {
  const items = Array.from({ length: 20 }, () => ({
    tx: {
      hash: "5bc7189129cae1e4d4c108f184e1861181d4fa1456acf83256e4344aecd22bdf",
    },
    md: "{todo: true}",
  }));

  const columns = [
    {
      key: "date",
      render: () => {
        return <DateCell time='2026-01-04T21:44:52' />;
      },
      title: <p>Date</p>,
      widthPx: 60,
    },
    {
      key: "key",
      render: () => {
        return <p>612</p>;
      },
      title: <p>key</p>,
      widthPx: 60,
    },
    {
      key: "hash",
      render: item => (
        <div className='flex items-center gap-1'>
          <Link
            to='/tx/$hash'
            params={{
              hash: item?.tx?.hash,
            }}
            title={String(item?.tx?.hash)}
            className='text-primary'
          >
            {item?.tx?.hash ? formatString(item?.tx?.hash, "long") : "-"}
          </Link>
          {item?.tx?.hash && (
            <Copy copyText={item?.tx?.hash} className='translate-y-[2px]' />
          )}
        </div>
      ),
      title: <p>Hash</p>,
      widthPx: 60,
    },
    {
      key: "size",
      render: () => <SizeCell maxSize={1231231323} size={123321} />,
      title: <p className='w-full text-right'>Size</p>,
      widthPx: 30,
    },
    {
      key: "md",
      render: item => <MetadataCell metadata={item.md} />,
      title: <p className='w-full text-right'>Metadata</p>,
      widthPx: 60,
    },
  ];

  return (
    <PageBase
      metadataTitle='metadata'
      title='Metadata'
      breadcrumbItems={[{ label: "Metadata" }]}
    >
      <TableList loading={false} items={items} columns={columns} />
    </PageBase>
  );
};
