import type { FC } from "react";

import { PageBase } from "@/components/global/PageBase";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";

import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";

export const ScriptListPage: FC = () => {
  const items = Array.from({ length: 20 }, () => ({
    hash: "0237cc313756ebb5bcfc2728f7bdc6a8047b471220a305aa373b278a",
    label: {
      category: "Some",
    },
    stat: {
      recent: {
        tx_payment_cred: {
          out: {
            count: 10000,
          },
        },
        redeemer: {
          count: 1000,
          sum: 1000000000,
        },
      },
      previous: {
        redeemer: {
          count: 5000,
        },
      },
    },
  }));

  const columns = [
    {
      key: "dapp",
      render: item => {
        if (!item?.hash && !item?.label?.label) {
          return "-";
        }

        return (
          <div className={`flex w-[calc(100%-40px)] flex-col`}>
            {item?.label?.label && (
              <Link
                to='/script/$hash'
                params={{ hash: item?.hash }}
                className='w-fit text-primary'
              >
                {item?.label?.label}
              </Link>
            )}
            <div className='flex items-center gap-1/2'>
              <Link
                to='/script/$hash'
                params={{ hash: item?.hash }}
                className={
                  item?.label?.label
                    ? "text-text-xs hover:text-grayTextPrimary"
                    : "text-text-sm text-primary"
                }
                disabled={!!item?.label?.label}
              >
                {formatString(item?.hash, "long")}
              </Link>
              <Copy copyText={item?.hash} size={item?.label?.label ? 10 : 13} />
            </div>
          </div>
        );
      },
      title: "Hash",
      widthPx: 120,
    },
    {
      key: "category",
      render: item => {
        if (!item?.label?.category) {
          return <p className='text-center'>-</p>;
        }

        return (
          <Badge color='blue' className='text-center'>
            {item?.label?.category}
          </Badge>
        );
      },
      title: <p className='text-center'>Category</p>,
      widthPx: 50,
    },
    {
      key: "users",
      render: item => {
        if (!item?.stat.recent?.tx_payment_cred?.out?.count) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            {formatNumber(item?.stat.recent.tx_payment_cred.out.count)}
          </p>
        );
      },
      title: <p className='w-full text-right'>Users</p>,
      widthPx: 50,
    },
    {
      key: "int_this_epoch",
      render: item => {
        if (!item?.stat?.recent?.redeemer?.count) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            {formatNumber(item?.stat.recent?.redeemer?.count)}
          </p>
        );
      },
      title: <p className='w-full text-right'>Interactions this epoch</p>,
      widthPx: 80,
    },
    {
      key: "activity_change",
      render: item => {
        if (
          !item?.stat?.recent?.redeemer?.count ||
          !item?.stat?.previous?.redeemer?.count
        ) {
          return <p className='text-right'>-</p>;
        }

        const percent = (
          (item?.stat.recent.redeemer.count /
            item?.stat.previous.redeemer.count) *
          100
        ).toFixed(2);

        return <p className='text-right'>{percent}%</p>;
      },
      title: <p className='w-full text-right'>Activity change</p>,
      widthPx: 80,
    },
    {
      key: "epoch_volume",
      render: item => {
        if (!item?.stat?.recent?.redeemer?.sum) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-right'>
            <AdaWithTooltip data={item?.stat?.recent?.redeemer?.sum} />
          </p>
        );
      },
      title: <p className='w-full text-right'>Epoch volume</p>,
      widthPx: 80,
    },
  ];

  return (
    <PageBase
      metadataTitle='scriptList'
      title='Script List'
      breadcrumbItems={[{ label: "Script" }]}
    >
      <TableList loading={false} items={items} columns={columns} />
    </PageBase>
  );
};
