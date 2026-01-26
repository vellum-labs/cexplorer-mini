import { useState, type FC } from "react";
import { useMemo } from "react";

import { useFetchTxByHashes, useFetchTxMetadata, cleanHash } from "@/services/asset";

import { Dropdown } from "@vellumlabs/cexplorer-sdk/Dropdown";

interface AssetMetadataTabProps {
  mintTxHashes?: string[];
}

interface MetadataItem {
  key: number;
  json: unknown;
  txHash: string;
}

const shortenHash = (hash: string) => {
  if (!hash || hash.length < 16) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
};

export const AssetMetadataTab: FC<AssetMetadataTabProps> = ({
  mintTxHashes,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data: txData, isLoading: txLoading } = useFetchTxByHashes(
    mintTxHashes ?? []
  );

  const txIds = useMemo(() => {
    return txData?.tx?.map(t => t.id) ?? [];
  }, [txData]);

  const txIdToHash = useMemo(() => {
    const map = new Map<number, string>();
    txData?.tx?.forEach(t => {
      map.set(t.id, cleanHash(t.hash));
    });
    return map;
  }, [txData]);

  const { data, isLoading: metaLoading } = useFetchTxMetadata(txIds);

  const isLoading = txLoading || metaLoading;

  const items: MetadataItem[] = useMemo(() => {
    if (!data?.tx_metadata) return [];
    return data.tx_metadata
      .filter(m => m.json)
      .map(m => ({
        key: m.key,
        json: m.json,
        txHash: txIdToHash.get(m.tx_id) || "",
      }))
      .filter(item => item.txHash);
  }, [data, txIdToHash]);

  const currentHash = items[currentIndex]?.txHash || "";
  const currentItem = items[currentIndex];

  const tabOptions = items.map((item, index) => ({
    label: `Tx: ${shortenHash(item.txHash)}`,
    onClick: () => setCurrentIndex(index),
  }));

  if (isLoading) {
    return (
      <div className='flex flex-col gap-1.5'>
        <div className='h-7 w-16 animate-pulse rounded-max bg-border' />
        <div className='h-48 animate-pulse rounded-xl bg-border' />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className='w-full text-center text-text-sm text-grayTextPrimary'>
        No metadata found for this asset
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {items.length > 1 && (
        <div className='w-fit rounded-m border border-border'>
          <Dropdown
            id='metadata-tx-selector'
            width='200px'
            label={`Tx: ${shortenHash(currentHash)}`}
            options={tabOptions}
            triggerClassName='text-primary font-medium px-1.5 py-1'
            closeOnSelect
          />
        </div>
      )}
      {currentItem && (
        <div className='flex flex-col gap-1'>
          <div className='w-fit rounded-m border border-border bg-darker px-1.5 py-1/2 text-text-xs font-medium shadow-md'>
            {currentItem.key}
          </div>
          <div className='overflow-auto rounded-l border border-border bg-cardBg p-2 font-mono text-text-xs'>
            <pre className='whitespace-pre-wrap break-all'>
              {JSON.stringify(currentItem.json, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
