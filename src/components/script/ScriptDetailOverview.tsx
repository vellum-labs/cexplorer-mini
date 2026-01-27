import type { FC } from "react";
import type { ScriptData } from "@/services/script";

import { LoadingSkeleton } from "@vellumlabs/cexplorer-sdk/LoadingSkeleton";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { OverviewStatCard } from "@vellumlabs/cexplorer-sdk/OverviewStatCard";
import { Badge } from "@vellumlabs/cexplorer-sdk/Badge";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { HashCell } from "../tx/HashCell";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { FileBarChart, LineChart } from "lucide-react";
import { useFetchScriptStats } from "@/services/script";

interface ScriptDetailOverviewProps {
  data?: ScriptData;
  isLoading?: boolean;
}

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

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} kB`;
};

export const ScriptDetailOverview: FC<ScriptDetailOverviewProps> = ({
  data,
  isLoading,
}) => {
  const { data: statsData } = useFetchScriptStats(
    data?.script_hash ?? ""
  );

  const stats = statsData?.redeemer_aggregate?.aggregate;
  const interactionsCount = stats?.count ?? 0;
  const volumeTotal = stats?.sum?.fee ?? 0;

  const overviewList = [
    {
      label: "Script Hash",
      value: data?.script_hash ? (
        <div className='flex items-center gap-1'>
          <span className='text-text-sm font-medium'>
            {formatString(data.script_hash, "long")}
          </span>
          <Copy copyText={data.script_hash} />
        </div>
      ) : (
        "-"
      ),
    },
    {
      label: "Type",
      value: data?.type ? (
        <Badge color={getTypeColor(data.type)} rounded>
          {data.type}
        </Badge>
      ) : (
        "-"
      ),
    },
    {
      label: "Size",
      value: data?.size ? formatSize(data.size) : "-",
    },
    {
      label: "Creation Transaction",
      value: data?.creation_tx_hash ? (
        <HashCell hash={data.creation_tx_hash} />
      ) : (
        "-"
      ),
    },
  ];

  if (data?.value) {
    overviewList.push({
      label: "Script JSON",
      value: (
        <div className='max-h-[200px] overflow-auto rounded-m border border-border bg-darker p-1.5'>
          <pre className='whitespace-pre-wrap break-all font-mono text-text-xs'>
            {JSON.stringify(data.value, null, 2)}
          </pre>
        </div>
      ),
    });
  }

  if (data?.bytes) {
    overviewList.push({
      label: "Bytecode",
      value: (
        <div className='flex items-start gap-1'>
          <span className='max-w-[400px] truncate font-mono text-text-xs text-grayTextPrimary'>
            {formatString(data.bytes, "longer")}
          </span>
          <Copy copyText={data.bytes} />
        </div>
      ),
    });
  }

  return (
    <div className='flex w-full max-w-desktop flex-col gap-3 p-mobile pb-0 lg:flex-row lg:p-desktop lg:pb-0'>
      {isLoading ? (
        <>
          <LoadingSkeleton
            height='300px'
            maxHeight='300px'
            rounded='xl'
            className='grow basis-[500px]'
          />
          <section className='flex w-full flex-col gap-3 lg:w-[400px] lg:justify-between'>
            <LoadingSkeleton height='110px' rounded='xl' />
            <LoadingSkeleton height='110px' rounded='xl' />
          </section>
        </>
      ) : (
        <>
          <OverviewCard
            className='max-h-[400px] min-h-[290px] basis-[500px]'
            title='Script Overview'
            overviewList={overviewList}
          />
          <section className='flex w-full flex-col gap-3 lg:w-[400px]'>
            <OverviewStatCard
              icon={<LineChart color='var(--primary)' />}
              title='Volume total'
              value={volumeTotal}
              subTitle='Total fees (lovelace)'
              className='max-h-[110px]'
            />
            <OverviewStatCard
              title='Interactions total'
              icon={<FileBarChart color='var(--primary)' />}
              value={interactionsCount}
              subTitle='Redeemer executions'
              className='max-h-[140px]'
            />
          </section>
        </>
      )}
    </div>
  );
};
