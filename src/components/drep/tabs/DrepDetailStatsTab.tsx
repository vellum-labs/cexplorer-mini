import { memo } from "react";
import type { FC } from "react";

interface DrepDetailStatsTabProps {
  data: any[];
}

export const DrepDetailStatsTab: FC<DrepDetailStatsTabProps> = memo(function DrepDetailStatsTabMemo({
  data,
}) {
  return (
    <div className='relative w-full'>
      <div className='flex h-[400px] w-full items-center justify-center rounded-xl border border-border bg-darker'>
        <p className='text-grayTextPrimary'>Stats chart - Coming soon</p>
      </div>
    </div>
  );
});
