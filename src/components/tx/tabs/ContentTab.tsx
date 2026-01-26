import { SortBy } from "@/components/ui/SortBy";
import { useTxSortStore } from "@/stores/txSortStore";
import { TxContentTable } from "@/components/tx/TxContentTable";
import type { TxUtxo } from "@/services/tx";
import type { FC } from "react";

const selectItems = [
  {
    key: "value",
    value: "Value",
  },
  {
    key: "index",
    value: "Index",
  },
];

interface ContentTabProps {
  inputs: TxUtxo[];
  outputs: TxUtxo[];
}

export const ContentTab: FC<ContentTabProps> = ({ inputs, outputs }) => {
  const { sort, setSort } = useTxSortStore();

  return (
    <>
      <div className='mb-2 flex w-full items-center gap-2'>
        <SortBy
          selectItems={selectItems}
          setSelectedItem={setSort as any}
          selectedItem={sort}
          className='ml-auto w-fit'
        />
      </div>
      <div className='flex w-full flex-col gap-1 md:flex-row'>
        <TxContentTable
          title='Inputs'
          data={inputs}
          sort={sort}
          isOutput={false}
        />
        <TxContentTable
          title='Outputs'
          data={outputs}
          sort={sort}
          isOutput={true}
        />
      </div>
    </>
  );
};
