import type { FC } from "react";

interface AssetStatsTabProps {
  fingerprint: string;
}

export const AssetStatsTab: FC<AssetStatsTabProps> = ({ fingerprint }) => {
  return (
    <div className='relative w-full'>
      <div className='flex h-[400px] w-full items-center justify-center rounded-xl border border-border bg-darker'>
        <p className='text-grayTextPrimary'>Asset stats chart - Coming soon</p>
      </div>
    </div>
  );
};
