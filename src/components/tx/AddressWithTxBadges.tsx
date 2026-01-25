import { colors } from "@/constants/colors";
import type { TxUtxo } from "@/services/tx";
import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, FileDigit, CreditCard } from "lucide-react";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { Tooltip } from "@vellumlabs/cexplorer-sdk/Tooltip";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";

interface Props {
  utxo: TxUtxo;
}

export const AddressWithTxBadges = ({ utxo }: Props) => {
  const address = utxo.payment_addr?.bech32 || "";
  const isStake = address.startsWith("stake");

  return (
    <div className='mb-1 flex items-center gap-1'>
      <Link
        to={isStake ? "/stake/$stakeAddr" : "/address/$address"}
        params={isStake ? { stakeAddr: address } : { address }}
        className='block overflow-hidden overflow-ellipsis whitespace-nowrap text-text-sm text-primary'
        title={address}
      >
        <span className='hidden md:inline'>
          {formatString(address, "longer")}
        </span>
        <span className='md:hidden'>{formatString(address, "shorter")}</span>
      </Link>
      <Copy copyText={address} />
      <Tooltip
        content={
          <div className='flex w-[200px] flex-col items-center text-text-sm'>
            <p className='font-medium'>UTXO</p>
            <div className='mt-1/2 flex items-end justify-end break-all text-center text-text-sm'>
              <Link
                to='/tx/$hash'
                params={{ hash: utxo.tx_hash }}
                className='text-primary'
              >
                {`${utxo.tx_hash}#${utxo.tx_index}`}
              </Link>{" "}
              <Copy copyText={`${utxo.tx_hash}#${utxo.tx_index}`} />
            </div>
          </div>
        }
      >
        <div className='flex h-4 w-4 items-center justify-center rounded-max border-[1.5px] border-primary p-[2px]'>
          <ArrowLeftRight size={12} color={colors.primary} strokeWidth={3} />
        </div>
      </Tooltip>
      {utxo.datum_hash && (
        <Tooltip
          content={
            <div className='flex w-[200px] flex-col items-center'>
              <p className='w-full text-center font-medium'>Datum Hash</p>
              <div className='mt-1/2 flex items-end justify-end break-all text-center text-text-sm'>
                <span className='text-primary'>{utxo.datum_hash}</span>
                <Copy copyText={utxo.datum_hash} />
              </div>
            </div>
          }
        >
          <FileDigit size={16} color={colors.primary} />
        </Tooltip>
      )}
      {utxo.payment_addr?.cred && (
        <Tooltip
          content={
            <div className='flex w-[200px] flex-col items-center text-text-sm'>
              <p className='font-medium'>Payment Credential</p>
              <div className='mt-1/2 flex items-end justify-end break-all text-center text-text-sm'>
                <span className='break-all text-primary'>
                  {utxo.payment_addr.cred}
                </span>
                <Copy copyText={utxo.payment_addr.cred} />
              </div>
            </div>
          }
        >
          <div className='flex items-center'>
            <CreditCard size={15} color={colors.primary} />
          </div>
        </Tooltip>
      )}
      <span className='text-text-xs text-grayTextPrimary'>
        #{utxo?.tx_index}
      </span>
    </div>
  );
};
