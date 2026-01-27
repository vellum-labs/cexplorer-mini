import { useMemo, type FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";

import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { SizeCell } from "@vellumlabs/cexplorer-sdk/SizeCell";
import { HashCell } from "@/components/tx/HashCell";
import { useFetchScriptList } from "@/services/script";

const getTypeColor = (type: string): "blue" | "green" | "yellow" | "red" => {
  switch (type) {
    case "plutusV1":
      return "blue";
    case "plutusV2":
      return "green";
    case "plutusV3":
      return "yellow";
    case "timelock":
      return "red";
    default:
      return "blue";
  }
};

export const ScriptListPage: FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchScriptList(20);

  const items = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.mini_script_detail ?? []);
  }, [data]);

  const columns = [
    {
      key: "script_hash",
      render: item => {
        if (!item?.script_hash) {
          return "-";
        }

        return (
          <div className='flex w-[calc(100%-40px)] flex-col'>
            <div className='flex items-center gap-1/2'>
              <Link
                to='/script/$hash'
                params={{ hash: item?.script_hash }}
                className='text-text-sm text-primary'
              >
                {formatString(item?.script_hash, "long")}
              </Link>
              <Copy copyText={item?.script_hash} size={13} />
            </div>
          </div>
        );
      },
      title: "Script Hash",
      widthPx: 120,
    },
    {
      key: "type",
      render: item => {
        if (!item?.type) {
          return <p className='text-center'>-</p>;
        }

        return (
          <Badge color={getTypeColor(item.type)} className='text-center'>
            {item.type}
          </Badge>
        );
      },
      title: <p className='text-center'>Type</p>,
      widthPx: 50,
    },
    {
      key: "size",
      render: item => {
        if (!item?.size) {
          return <p className='text-right'>-</p>;
        }

        return <SizeCell size={item.size} maxSize={16384} />;
      },
      title: <p className='w-full text-right'>Size</p>,
      widthPx: 50,
    },
    {
      key: "creation_tx",
      render: item => {
        if (!item?.creation_tx_hash) {
          return <p className='text-right'>-</p>;
        }

        return (
          <div className='flex justify-end'>
            <HashCell hash={item.creation_tx_hash} />
          </div>
        );
      },
      title: <p className='w-full text-right'>Creation TX</p>,
      widthPx: 100,
    },
  ];

  return (
    <PageBase
      metadataTitle='scriptList'
      title='Script List'
      breadcrumbItems={[{ label: "Script" }]}
    >
      <TableList
        loading={isLoading}
        items={items}
        columns={columns}
        showMoreButton={hasNextPage}
        onFetch={fetchNextPage}
      />
    </PageBase>
  );
};
