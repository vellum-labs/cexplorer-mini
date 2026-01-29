import { useMemo, type FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";

import { DateCell } from "@vellumlabs/cexplorer-sdk/DateCell";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { SizeCell } from "@vellumlabs/cexplorer-sdk/SizeCell";
import { MetadataCell } from "@/components/global/MetadataCell";
import { useFetchMetadataList } from "@/services/metadata";

export const MetadataListPage: FC = () => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useFetchMetadataList(20);

  const items = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flat();
  }, [data]);

  const columns = [
    {
      key: "date",
      render: item => <DateCell time={item.block_time} />,
      title: <p>Date</p>,
      widthPx: 60,
    },
    {
      key: "key",
      render: item => <p>{item.key}</p>,
      title: <p>Key</p>,
      widthPx: 40,
    },
    {
      key: "hash",
      render: item => (
        <div className='flex items-center gap-1'>
          <Link
            to='/tx/$hash'
            params={{ hash: item.tx_hash }}
            title={item.tx_hash}
            className='text-primary'
          >
            {item.tx_hash ? formatString(item.tx_hash, "long") : "-"}
          </Link>
          {item.tx_hash && (
            <Copy copyText={item.tx_hash} className='translate-y-[2px]' />
          )}
        </div>
      ),
      title: <p>Hash</p>,
      widthPx: 80,
    },
    {
      key: "size",
      render: item => (
        <SizeCell maxSize={16384} size={item.size} />
      ),
      title: <p className='w-full text-right'>Size</p>,
      widthPx: 50,
    },
    {
      key: "md",
      render: item => <MetadataCell metadata={item.json} />,
      title: <p className='w-full text-right'>Metadata</p>,
      widthPx: 30,
    },
  ];

  return (
    <PageBase
      metadataTitle='metadata'
      title='Metadata'
      breadcrumbItems={[{ label: "Metadata" }]}
    >
      <TableList
        loading={isLoading}
        fetching={isFetching}
        items={items}
        columns={columns}
        showMoreButton={hasNextPage}
        onFetch={fetchNextPage}
      />
    </PageBase>
  );
};
