import type { TxAsset } from "@/services/tx";
import { formatNumberWithSuffix } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

interface Props {
  asset: TxAsset;
  type: "input" | "output";
  className?: string;
}

const hexToUtf8 = (hex: string): string => {
  try {
    const bytes = new Uint8Array(
      hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    );
    return new TextDecoder().decode(bytes);
  } catch {
    return hex;
  }
};

export const AssetLink = ({ asset, type, className }: Props) => {
  const fingerprint = asset.fingerprint;
  const assetName = asset.asset_name ? hexToUtf8(asset.asset_name) : fingerprint;
  const quantity = Number(asset.quantity);

  return (
    <Link
      to='/asset/$fingerprint'
      params={{ fingerprint }}
      title={fingerprint}
      className={`flex w-fit max-w-full rounded-s border border-border bg-background px-1 py-[1px] text-text-xs font-medium text-primary ${className}`}
    >
      <span className='flex items-center overflow-hidden text-ellipsis whitespace-nowrap'>
        {assetName.length > 20 ? `${assetName.slice(0, 20)}...` : assetName}
      </span>
      <span className='ml-auto min-w-fit pl-1'>
        {`${type === "input" ? "-" : ""}${formatNumberWithSuffix(quantity, true)}`}
      </span>
    </Link>
  );
};
