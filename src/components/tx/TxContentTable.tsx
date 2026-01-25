import type { TxUtxo } from "@/services/tx";
import { useMemo } from "react";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { AddressWithTxBadges } from "./AddressWithTxBadges";
import { AssetLink } from "@/components/asset/AssetLink";

interface Props {
  title: string;
  data: TxUtxo[];
  sort: "value" | "index";
  isOutput: boolean;
}

export const TxContentTable = ({ title, data, sort, isOutput }: Props) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) =>
      sort === "value"
        ? Number(b.value) - Number(a.value)
        : a.tx_index - b.tx_index
    );
  }, [data, sort]);

  const totalAda = useMemo(() => {
    return data.reduce((acc, curr) => acc + Number(curr.value), 0);
  }, [data]);

  return (
    <section className='m-0 flex h-full w-full flex-col rounded-l border border-border shadow-md'>
      <div className='flex w-full justify-between rounded-tl-l rounded-tr-l border-b border-border bg-darker px-2 py-1 text-text-sm font-medium text-grayTextPrimary'>
        <span>{title}</span>
        <span className='text-right text-text-sm font-regular text-grayTextPrimary'>
          Total: <AdaWithTooltip data={totalAda ?? 0} />
        </span>
      </div>

      {sortedData?.map((utxo, index) => (
        <div
          key={index}
          className='flex min-h-[70px] justify-between border-b border-border px-2 py-1.5 last:rounded-bl-xl last:rounded-br-xl last:border-b-0 odd:bg-darker'
        >
          <div className='flex flex-col justify-between'>
            <AddressWithTxBadges utxo={utxo} />
            <div className='flex w-full flex-wrap gap-1/2'>
              {utxo?.asset_list &&
                utxo.asset_list.length > 0 &&
                utxo.asset_list.map((asset, assetIndex) => (
                  <AssetLink
                    type={isOutput ? "output" : "input"}
                    asset={asset}
                    key={assetIndex}
                  />
                ))}
            </div>
          </div>
          <span className='inline-block w-fit text-nowrap text-text-sm'>
            <AdaWithTooltip data={Number(utxo.value)} />
          </span>
        </div>
      ))}
    </section>
  );
};
