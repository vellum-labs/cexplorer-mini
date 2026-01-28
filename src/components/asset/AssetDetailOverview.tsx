import type { FC } from "react";
import type { AssetDetailData } from "@/services/asset";

import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatNumber, formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { OverviewCard } from "@vellumlabs/cexplorer-sdk/OverviewCard";

import { decodeHexName } from "@/utils/decodeHexName";

interface AssetDetailOverviewProps {
  assetDetail: AssetDetailData | undefined;
  isLoading?: boolean;
}

export const AssetDetailOverview: FC<AssetDetailOverviewProps> = ({
  assetDetail,
  isLoading,
}) => {
  const name = assetDetail?.name || "";
  const policy = assetDetail?.policy || "";
  const fingerprint = assetDetail?.fingerprint || "";
  const quantity = assetDetail?.quantity ?? 0;
  const mintCount = assetDetail?.mint?.length ?? 0;

  const decodedName = name ? decodeHexName(name) : null;

  const overview = [
    {
      label: "Name",
      value: isLoading ? (
        <div className='h-5 w-32 animate-pulse rounded bg-border' />
      ) : (
        <div className='flex flex-col'>
          <span className='text-grayText overflow-hidden text-ellipsis whitespace-nowrap text-primary'>
            <p className='break-words break-all'>{decodedName ?? (name || "-")}</p>
          </span>
          {decodedName && (
            <p className='break-words break-all text-text-xs text-grayTextSecondary'>
              {formatString(name, "long")}
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Policy ID",
      value: isLoading ? (
        <div className='h-5 w-40 animate-pulse rounded bg-border' />
      ) : (
        <span className='flex items-center gap-1'>
          {formatString(policy, "long")}
          {policy && <Copy copyText={policy} />}
        </span>
      ),
    },
    {
      label: "Fingerprint",
      value: isLoading ? (
        <div className='h-5 w-40 animate-pulse rounded bg-border' />
      ) : (
        <span className='flex items-center gap-1'>
          {formatString(fingerprint, "long")}
          {fingerprint && <Copy copyText={fingerprint} />}
        </span>
      ),
    },
  ];

  const blockchain = [
    {
      label: "Supply",
      value: isLoading ? (
        <div className='h-5 w-16 animate-pulse rounded bg-border' />
      ) : (
        formatNumber(quantity)
      ),
    },
    {
      label: "Mint count",
      value: isLoading ? (
        <div className='h-5 w-16 animate-pulse rounded bg-border' />
      ) : (
        formatNumber(mintCount)
      ),
    },
  ];

  return (
    <section className='flex w-full flex-col gap-1.5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex-grow basis-[390px] md:flex-shrink-0'>
          <OverviewCard
            title='Overview'
            overviewList={overview}
            labelClassname='min-w-[135px] text-nowrap'
            className='md:h-full'
          />
        </div>
        <div className='flex-grow basis-[350px] md:flex-shrink-0'>
          <OverviewCard
            title='Blockchain'
            overviewList={blockchain}
            labelClassname='text-nowrap min-w-[160px]'
            className='h-full'
          />
        </div>
      </div>
    </section>
  );
};
