import type { TxAsset } from "@/services/tx";
import { formatNumberWithSuffix } from "@vellumlabs/cexplorer-sdk/Format";
import { Link } from "@tanstack/react-router";

interface Props {
  asset: TxAsset;
  type: "input" | "output";
  className?: string;
}

const hexToUtf8 = (hex: string): string | null => {
  try {
    if (/^[0-9a-fA-F]+$/.test(hex) && hex.length % 2 === 0) {
      const bytes = new Uint8Array(
        hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
      );
      const decoded = new TextDecoder().decode(bytes);
      if (/^[\x20-\x7E]+$/.test(decoded)) {
        return decoded;
      }
    }
  } catch {
    return null;
  }
  return null;
};

export const AssetLink = ({ asset, type, className }: Props) => {
  const fingerprint = asset.fingerprint;
  const decodedName = asset.asset_name ? hexToUtf8(asset.asset_name) : null;
  const displayName = decodedName ?? fingerprint;
  const quantity = Number(asset.quantity);

  return (
    <Link
      to='/asset/$fingerprint'
      params={{ fingerprint }}
      title={fingerprint}
      className={`flex w-fit max-w-full rounded-s border border-border bg-background px-1 py-[1px] text-text-xs font-medium text-primary ${className}`}
    >
      <span className='flex items-center overflow-hidden text-ellipsis whitespace-nowrap'>
        {displayName.length > 20 ? `${displayName.slice(0, 20)}...` : displayName}
      </span>
      <span className='ml-auto min-w-fit pl-1'>
        {`${type === "input" ? "-" : ""}${formatNumberWithSuffix(quantity, true)}`}
      </span>
    </Link>
  );
};
