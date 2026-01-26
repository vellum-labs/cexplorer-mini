import type { FC } from "react";
import type { TxUtxo } from "@/services/tx";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";

interface ReferenceInputsTabProps {
  referenceInputs: TxUtxo[] | null;
  isLoading?: boolean;
}

export const ReferenceInputsTab: FC<ReferenceInputsTabProps> = ({
  referenceInputs,
  isLoading,
}) => {
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
              {formatString(address, "longer")}
            </Link>
            <Copy copyText={address} />
          </div>
        );
      },
      title: "Address",
      widthPx: 150,
    },
    {
      key: "tx",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as TxUtxo;
        return (
          <div className='flex items-center gap-1'>
            <Link
              to='/tx/$hash'
              params={{ hash: item.tx_hash }}
              className='text-primary'
            >
              {formatString(item.tx_hash, "longer")}
            </Link>
            <Copy copyText={item.tx_hash} />
          </div>
        );
      },
      title: "Transaction",
      widthPx: 150,
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
  ];

  return (
    <TableList
      withPadding={false}
      showMoreButton={false}
      loading={isLoading}
      columns={columns}
      items={referenceInputs ?? []}
      storeKey='reference_inputs_tab_list'
    />
  );
};
