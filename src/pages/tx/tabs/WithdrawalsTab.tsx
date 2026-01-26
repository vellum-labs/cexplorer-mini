import type { FC } from "react";
import type { Withdrawal } from "@/services/tx";
import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";

interface WithdrawalsTabProps {
  withdrawals: Withdrawal[] | null;
  isLoading?: boolean;
}

export const WithdrawalsTab: FC<WithdrawalsTabProps> = ({
  withdrawals,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='h-24 animate-pulse rounded-xl bg-border' />
    );
  }

  if (!withdrawals || withdrawals.length === 0) {
    return (
      <p className='w-full text-center text-text-sm text-grayTextPrimary'>
        No withdrawals found in this transaction
      </p>
    );
  }

  const columns = [
    {
      key: "stake",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as Withdrawal;
        return (
          <div className='flex items-center gap-1/2'>
            <Link
              className='text-primary'
              to='/stake/$stakeAddr'
              params={{ stakeAddr: item.stake_addr }}
            >
              {formatString(item.stake_addr, "longer")}
            </Link>
            <Copy copyText={item.stake_addr} />
          </div>
        );
      },
      title: "Stake",
      widthPx: 200,
    },
    {
      key: "total",
      render: (row: Record<string, unknown>) => {
        const item = row as unknown as Withdrawal;
        return (
          <span className='flex justify-end text-right'>
            <AdaWithTooltip data={Number(item.amount)} />
          </span>
        );
      },
      title: <span className='flex w-full justify-end'>Total</span>,
      widthPx: 80,
    },
  ];

  return (
    <TableList
      withPadding={false}
      columns={columns}
      items={withdrawals}
      storeKey='withdrawals_tab_list'
    />
  );
};
