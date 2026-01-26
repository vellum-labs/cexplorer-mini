import type { PlutusContract } from "@/services/tx";
import type { FC } from "react";
import { useState } from "react";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";

interface ContractsTabProps {
  contracts: PlutusContract[] | null;
  isLoading?: boolean;
}

export const ContractsTab: FC<ContractsTabProps> = ({
  contracts,
  isLoading,
}) => {
  const totalSize =
    contracts
      ?.reduce((acc, contract) => acc + contract.size / 1024, 0)
      .toFixed(2) ?? "0";

  if (isLoading) {
    return (
      <div className='flex flex-col gap-1.5'>
        <div className='h-7 w-32 animate-pulse rounded-max bg-border' />
        <div className='h-96 animate-pulse rounded-xl bg-border' />
      </div>
    );
  }

  if (!contracts || contracts.length === 0) {
    return (
      <p className='w-full text-center text-text-sm text-grayTextPrimary'>
        No contracts found in this transaction
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex w-fit gap-1 rounded-max border border-border bg-darker px-1.5 py-1/2 text-text-xs font-medium shadow-md'>
        Total Script Size: {totalSize}kB
      </div>
      {contracts.map((contract, index) => (
        <ContractItem key={index} contract={contract} index={index} />
      ))}
    </div>
  );
};

interface ContractItemProps {
  contract: PlutusContract;
  index: number;
}

const ContractItem: FC<ContractItemProps> = ({ contract, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <section className='flex flex-col rounded-l border border-b border-border bg-darker px-2 py-1.5 shadow-md'>
      <div className='flex flex-wrap items-center gap-1'>
        {open ? (
          <ChevronDown
            onClick={() => setOpen(false)}
            className='cursor-pointer select-none'
            size={17}
          />
        ) : (
          <ChevronRight
            onClick={() => setOpen(true)}
            className='cursor-pointer select-none'
            size={17}
          />
        )}
        <div className='w-fit rounded-m border border-border bg-background px-1 py-1/2 text-text-xs font-medium'>
          Script #{index + 1}
        </div>
        <span className='flex h-[25px] items-center gap-1 rounded-max border border-border bg-secondaryBg px-1 text-text-xs font-medium'>
          {contract.valid_contract ? (
            <CheckCircle size={14} className='text-green-500' />
          ) : (
            <XCircle size={14} className='text-red-500' />
          )}
          {contract.valid_contract ? "Valid" : "Invalid"}
        </span>
        <span className='flex h-[25px] items-center rounded-max border border-border bg-secondaryBg px-1 text-text-xs font-medium'>
          Size: {(contract.size / 1024).toFixed(2)}kB
        </span>
      </div>

      <div className={`mt-4 flex-col gap-1 text-text-sm ${open ? "flex" : "hidden"}`}>
        <div className='flex flex-col gap-1'>
          <span className='font-medium text-grayTextPrimary'>Script Hash:</span>
          <span className='flex items-center gap-1'>
            <span className='block overflow-hidden text-ellipsis text-primary'>
              {contract.script_hash}
            </span>
            <Copy copyText={contract.script_hash} />
          </span>
        </div>

        <div className='mt-2 flex flex-col gap-1'>
          <span className='font-medium text-grayTextPrimary'>Address:</span>
          <span className='flex items-center gap-1'>
            <span
              className='block overflow-hidden text-ellipsis text-primary'
              title={contract.address}
            >
              {formatString(contract.address, "long")}
            </span>
            <Copy copyText={contract.address} />
          </span>
        </div>

        <div className='mt-2 flex flex-col gap-1'>
          <span className='font-medium text-grayTextPrimary'>Bytecode:</span>
          <div className='max-h-[200px] overflow-auto rounded-m border border-border bg-cardBg p-2 font-mono text-text-xs'>
            {contract.bytecode}
          </div>
        </div>
      </div>
    </section>
  );
};
