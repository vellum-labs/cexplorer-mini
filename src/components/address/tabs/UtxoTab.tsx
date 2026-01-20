import type { FC } from "react";

import { TableList } from "@/components/global/TableList";

import { HashCell } from "@/components/tx/HashCell";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";
import { calculateMinUtxo } from "@/utils/calculateMinUtxo";

export const UtxoTab: FC = () => {
  const items = Array.from({ length: 20 }, () => ({
    tx_hash: "8c773f12060a4e72b489ce709fa4aa1f2b94d666ac33793fc4d7a14b08c347ec",
    tx_index: 1,
    block_height: 12714378,
    block_time: 1764477114,
    value: 18571915041309,
    datum_hash: null,
    asset_list: [
      {
        name: "03438e15de1211a33a9a604292468f983f239879a011725497dcf1165245565552",
        quantity: 1,
      },
      {
        name: "10a1b74dec474a68607e7e93977d2709a9b0ef09ed49d10f8a8b3ba543617368657746",
        quantity: 5,
      },
      {
        name: "17e953e5995a2f54c38b4ae4fa5a110b36be36ff892a66c36a511598464841313030424c5545323634",
        quantity: 1,
      },
    ],
  }));

  const columns = [
    {
      key: "hash",
      render: item => <HashCell hash={item?.tx_hash} />,
      jsonFormat: item => {
        if (!item?.tx_hash) {
          return "-";
        }

        return item.tx_hash;
      },
      title: "TX Hash",
      widthPx: 65,
    },
    {
      key: "index",
      render: item => (
        <p>{item?.tx_index !== undefined ? item.tx_index : "-"}</p>
      ),
      title: <p>Index</p>,
      widthPx: 20,
    },
    {
      key: "amount",
      render: item => (
        <p>
          {item?.value !== undefined ? (
            <>
              <div className='flex flex-col gap-1/2'>
                <div className='flex items-center gap-1.5'>
                  <AdaWithTooltip data={item.value} />
                  <Copy copyText={item.value} />
                  {!!item?.asset_list?.length && <span>+</span>}
                </div>
                {!!item?.asset_list?.length && (
                  <div className='flex flex-col'>
                    {item.asset_list.map((item, i) => (
                      <div key={i} className='flex w-full items-center'>
                        <div className='flex min-w-[200px] items-center gap-1.5'>
                          <Copy copyText={item.quantity} />
                          <span>{item.quantity}</span>
                        </div>
                        <div className='flex items-center justify-start gap-1.5 overflow-hidden'>
                          <Copy copyText={item.name} />
                          <Link
                            to='/asset/$fingerprint'
                            params={{
                              fingerprint: "fingerprint",
                            }}
                            className='text-primary'
                          >
                            <span>{formatString(item.name, "long")}</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            "-"
          )}
        </p>
      ),
      extraContent: (
        <div className='h-[400px] w-full border border-border'></div>
      ),
      title: <p>Amount</p>,
      widthPx: 260,
    },
    {
      key: "min_utxo",
      render: item => {
        if (!item?.asset_list?.length) {
          return <p className='text-right'>-</p>;
        }

        return (
          <p className='text-end'>
            <AdaWithTooltip data={calculateMinUtxo(item?.asset_list)} />
          </p>
        );
      },
      title: <p className='w-full text-right'>Min UTXO ADA</p>,
      widthPx: 55,
    },
  ];

  return (
    <TableList
      title='All UTXOs'
      withPadding={false}
      columns={columns}
      items={items}
      storeKey='utxo_list'
    />
  );
};
