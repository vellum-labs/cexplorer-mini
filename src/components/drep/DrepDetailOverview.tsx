import type { FC } from "react";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { DelegatorsLabel } from "@vellumlabs/cexplorer-sdk/DelegatorsLabel";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";
import { PulseDot } from "@vellumlabs/cexplorer-sdk/PulseDot";
import { TimeDateIndicator } from "@vellumlabs/cexplorer-sdk/TimeDateIndicator";

export const DrepDetailOverview: FC = () => {
  const about = [
    {
      label: "Name",
      value: "Name of DREP",
    },
    {
      label: "DRep ID",
      value: (
        <div className='flex items-center gap-1/2'>
          <span>
            {formatString(
              "drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j",
              "long",
            )}
          </span>
          <Copy
            copyText='drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j'
            className='translate-y-[2px]'
          />
        </div>
      ),
    },
    {
      label: "Stake key",
      value: (
        <div className='flex items-center gap-1/2'>
          <span>
            {formatString(
              "drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j",
              "long",
            )}
          </span>
          <Copy
            copyText='drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j'
            className='translate-y-[2px]'
          />
        </div>
      ),
    },
    {
      label: "Registered",
      value: <TimeDateIndicator time='2026-01-04T21:44:52' />,
    },
    {
      label: "Last updated",
      value: <TimeDateIndicator time='2026-01-04T21:44:52' />,
    },
  ];
  const voting = [
    {
      label: "Status",
      value: (
        <div className='relative flex h-[24px] w-fit items-center justify-end gap-1 rounded-m border border-border px-[10px]'>
          <PulseDot />
          <span className='text-text-xs font-medium'>Active</span>
        </div>
      ),
    },
    {
      label: "DRep metadata",
      value: <span className='font-medium text-redText'>Not provided</span>,
    },
    {
      label: "Voting power",
      value: <AdaWithTooltip data={231232132131} />,
    },
    {
      label: <DelegatorsLabel minDelegationAda='3213123' />,
      value: formatNumber(3213),
    },
    {
      label: "Rewards address",
      value: (
        <div className='flex items-center gap-1/2'>
          <span>
            {formatString(
              "drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j",
              "long",
            )}
          </span>
          <Copy
            copyText='drep1ygr9tuapcanc3kpeyy4dc3vmrz9cfe5q7v9wj3x9j0ap3tswtre9j'
            className='translate-y-[2px]'
          />
        </div>
      ),
    },
  ];

  return (
    <section className='flex w-full flex-col items-center'>
      <div className='flex w-full max-w-desktop flex-grow flex-wrap gap-3 px-mobile pt-1.5 md:px-desktop xl:flex-nowrap xl:justify-start'>
        <div className='flex grow basis-[980px] flex-wrap items-stretch gap-3'>
          <div className='flex-grow basis-[410px] md:flex-shrink-0'>
            <OverviewCard
              title='About'
              overviewList={about}
              className='h-full'
            />
          </div>

          <div className='flex-grow basis-[410px] md:flex-shrink-0'>
            <OverviewCard
              title='Voting'
              overviewList={voting}
              className='h-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
