import type { FC } from "react";
import { useState, useMemo } from "react";

import { TableList } from "@/components/global/TableList";

import { HashCell } from "@/components/tx/HashCell";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";
import { calculateMinUtxo } from "@/utils/calculateMinUtxo";
import { useFetchAddressUtxo } from "@/services/address";

const decodeHexName = (name: string): string | null => {
  try {
    if (/^[0-9a-fA-F]+$/.test(name) && name.length % 2 === 0) {
      const bytes = name.match(/.{2}/g)?.map(b => parseInt(b, 16)) ?? [];
      const decoded = String.fromCharCode(...bytes);
      if (/^[\x20-\x7E]+$/.test(decoded)) {
        return decoded;
      }
    }
  } catch {
    return null;
  }
  return null;
};

interface UtxoTabProps {
  address?: string;
}

const PAGE_SIZE = 20;

export const UtxoTab: FC<UtxoTabProps> = ({ address }) => {
  const { data, isLoading } = useFetchAddressUtxo(address ?? "");
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const utxoSet = data?.mini_utxo?.[0]?.utxo_list?.[0]?.utxo_set ?? [];

  const items = useMemo(() => {
    return utxoSet.slice(0, displayCount);
  }, [utxoSet, displayCount]);

  const hasNextPage = displayCount < utxoSet.length;

  const fetchNextPage = () => {
    setDisplayCount(prev => prev + PAGE_SIZE);
  };

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
                    {item.asset_list.map((asset, i) => {
                      const decodedName = asset.name ? decodeHexName(asset.name) : null;
                      return (
                        <div key={i} className='flex w-full items-center'>
                          <div className='flex min-w-[200px] items-center gap-1.5'>
                            <Copy copyText={asset.quantity} />
                            <span>{asset.quantity}</span>
                          </div>
                          <div className='flex items-center justify-start gap-1.5 overflow-hidden'>
                            <Copy copyText={asset.name} />
                            {asset.fingerprint ? (
                              <Link
                                to='/asset/$fingerprint'
                                params={{
                                  fingerprint: asset.fingerprint,
                                }}
                                className='text-primary'
                              >
                                <div className='flex flex-col'>
                                  <span>{decodedName ?? formatString(asset.name, "long")}</span>
                                  {decodedName && (
                                    <span className='text-text-xs text-grayTextSecondary'>
                                      {formatString(asset.name, "long")}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ) : (
                              <div className='flex flex-col'>
                                <span>{decodedName ?? formatString(asset.name, "long")}</span>
                                {decodedName && (
                                  <span className='text-text-xs text-grayTextSecondary'>
                                    {formatString(asset.name, "long")}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            "-"
          )}
        </p>
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
      loading={isLoading}
      showMoreButton={hasNextPage}
      onFetch={fetchNextPage as any}
    />
  );
};
