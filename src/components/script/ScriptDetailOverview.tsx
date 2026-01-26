import type { FC } from "react";

import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk/LoadingSkeleton";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { OverviewStatCard } from "@vellumlabs/cexplorer-sdk/OverviewStatCard";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { PurposeBadge } from "@vellumlabs/cexplorer-sdk/PurposeBadge";
import { HashCell } from "../tx/HashCell";
import { FileBarChart, LineChart } from "lucide-react";

export const ScriptDetailOverview: FC = () => {
  const isLoading = false;

  const overviewList = [
    {
      label: "dApp",
      value: "Wingriders - Farm/Voting (v2)",
    },
    {
      label: "Category",
      value: (
        <div className='flex'>
          <Badge
            color='blue'
            rounded
            className={`h-6' mr-2`}
            style={{
              filter: `hue-rotate(${2 * 45}deg)`,
            }}
          >
            Purpose
          </Badge>
        </div>
      ),
    },
    {
      label: "Type",
      value: (
        <Badge color='yellow' rounded>
          PlutusV1
        </Badge>
      ),
    },
    {
      label: "Purpose",
      value: <PurposeBadge purpose='Spend' />,
    },
    {
      label: "Size",
      value: "1.73" + "kB",
    },
    {
      label: "Origin transaction",
      value: (
        <HashCell
          hash={
            "fdd4a62adf630e4ce86c3a1c3b38846de1dc243f10691ef90b6bddc4ecc0c12f"
          }
        />
      ),
    },
    {
      label: "Bytes",
      value: "TBD",
    },
  ];

  return (
    <div className='flex w-full max-w-desktop flex-col gap-3 p-mobile pb-0 lg:flex-row lg:p-desktop lg:pb-0'>
      {isLoading ? (
        <>
          <LoadingSkeleton
            height='400px'
            maxHeight='400px'
            rounded='xl'
            className='grow basis-[500px]'
          />
          <section className='flex w-full flex-col gap-3 lg:w-[400px] lg:justify-between'>
            <LoadingSkeleton height='110px' rounded='xl' className='' />
            <LoadingSkeleton height='110px' rounded='xl' className='' />
          </section>
        </>
      ) : (
        <>
          <OverviewCard
            className='max-h-[400px] min-h-[290px] basis-[500px]'
            title='Script overfview'
            overviewList={overviewList}
          />
          <section className='flex w-full flex-col gap-3 lg:w-[400px]'>
            <OverviewStatCard
              icon={<LineChart color='var(--primary)' />}
              title='Volume total'
              value={3213123}
              subTitle='Active Epochs'
              className='max-h-[110px]'
            />
            <OverviewStatCard
              title='Interactions total'
              icon={<FileBarChart color='var(--primary)' />}
              value={45643211231}
              subTitle='Active epochs'
              className='max-h-[140px]'
            />
          </section>
        </>
      )}
    </div>
  );
};
