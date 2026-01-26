import type { FC } from "react";
import type { TxMetadata } from "@/services/tx";

interface MetadataTabProps {
  metadata: TxMetadata;
  isLoading?: boolean;
}

export const MetadataTab: FC<MetadataTabProps> = ({
  metadata,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='flex flex-col gap-1.5'>
        <div className='h-7 w-16 animate-pulse rounded-max bg-border' />
        <div className='h-48 animate-pulse rounded-xl bg-border' />
      </div>
    );
  }

  if (!metadata || Object.keys(metadata).length === 0) {
    return (
      <p className='w-full text-center text-text-sm text-grayTextPrimary'>
        No metadata found in this transaction
      </p>
    );
  }

  const metadataEntries = Object.entries(metadata);

  return (
    <div className='flex flex-col gap-2'>
      {metadataEntries.map(([key, value]) => (
        <div key={key} className='flex flex-col gap-1'>
          <div className='w-fit rounded-m border border-border bg-darker px-1.5 py-1/2 text-text-xs font-medium shadow-md'>
            {key}
          </div>
          <div className='overflow-auto rounded-l border border-border bg-cardBg p-2 font-mono text-text-xs'>
            <pre className='whitespace-pre-wrap break-all'>
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};
