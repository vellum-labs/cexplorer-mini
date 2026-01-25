import type { FC } from "react";
import type { TxUtxo } from "@/services/tx";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { AssetLink } from "@/components/asset/AssetLink";

interface CollateralTabProps {
  collateralInputs: TxUtxo[] | null;
  isLoading?: boolean;
}

export const CollateralTab: FC<CollateralTabProps> = ({
  collateralInputs,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='h-24 animate-pulse rounded-xl bg-border' />
    );
  }

  if (!collateralInputs || collateralInputs.length === 0) {
    return (
      <p className='w-full text-center text-text-sm text-grayTextPrimary'>
        No collateral found in this transaction
      </p>
    );
  }

  const columns = [
    {
      key: "address",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as TxUtxo;
        const address = item.payment_addr?.bech32 || "";
        const isStake = address.startsWith("stake");

        return (
          <div className='flex items-center gap-1/2'>
            <Link
              className='text-primary'
              to={isStake ? "/stake/$stakeAddr" : "/address/$address"}
              params={isStake ? { stakeAddr: address } : { address }}
            >
              {formatString(address, "long")}
            </Link>
            <Copy copyText={address} />
          </div>
        );
      },
      title: "Address",
      widthPx: 120,
    },
    {
      key: "tx",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as TxUtxo;
        return (
          <p className='flex items-center gap-1 text-primary' title={item.tx_hash}>
            <Link
              to='/tx/$hash'
              params={{ hash: item.tx_hash }}
              className='flex justify-end text-primary'
            >
              {formatString(item.tx_hash, "long")}
            </Link>
            <Copy copyText={item.tx_hash} className='stroke-grayText' />
          </p>
        );
      },
      title: "Transaction",
      widthPx: 80,
    },
    {
      key: "value",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as TxUtxo;
        return (
          <span className='flex justify-end'>
            <AdaWithTooltip data={Number(item.value)} />
          </span>
        );
      },
      title: <p className='w-full text-right'>Collateral</p>,
      widthPx: 80,
    },
    {
      key: "assets",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as TxUtxo;
        if (!item.asset_list || item.asset_list.length === 0) {
          return <span className='text-grayTextPrimary'>-</span>;
        }
        return (
          <span className='flex flex-wrap justify-end gap-1/2'>
            {item.asset_list.map((asset, index) => (
              <AssetLink
                key={index}
                type='input'
                asset={asset}
                className='min-w-[110px] max-w-[110px]'
              />
            ))}
          </span>
        );
      },
      title: <p className='w-full text-right'>Assets</p>,
      widthPx: 100,
    },
  ];

  return (
    <TableList
      withPadding={false}
      columns={columns}
      items={collateralInputs}
      storeKey='collateral_tab_list'
    />
  );
};
