import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vellumlabs/cexplorer-sdk/GlobalTable/Components";
import { formatNumber } from "@vellumlabs/cexplorer-sdk/Format";
import { Download } from "lucide-react";
import { Fragment, type FC } from "react";

export const EpochParameters: FC = () => {
  const tableHeader = [
    {
      key: "explanation",
      title: "Explanation",
      width: 100,
    },
    {
      key: "parameter",
      title: "Parameter",
      width: 85,
    },
    {
      key: "value",
      title: <p className='w-full text-right'>Value</p>,
      width: 85,
    },
  ];

  const rows = [
    {
      key: "min_fee_a",
      columns: [
        {
          title: "The 'a' parameter to calculate the minimum transaction fee.",
        },
        {
          title: "min_fee_a",
        },
        {
          title: <p className='w-full text-right'>{formatNumber(44)}</p>,
        },
      ],
    },
    {
      key: "min_fee_b",
      columns: [
        {
          title: "The 'b' parameter to calculate the minimum transaction fee.",
        },
        {
          title: "min_fee_b",
        },
        {
          title: <p className='w-full text-right'>{formatNumber(155381)}</p>,
        },
      ],
    },
    {
      key: "max_block_size",
      columns: [
        {
          title: "The maximum block size (in bytes).",
        },
        {
          title: "max_block_size",
        },
        {
          title: <p className='text-right'>{formatNumber(90112)}</p>,
        },
      ],
    },
    {
      key: "max_tx_size",
      columns: [
        {
          title: "The maximum transaction size (in bytes).",
        },
        {
          title: "max_tx_size",
        },
        {
          title: <p className='text-right'>{formatNumber(1100)}</p>,
        },
      ],
    },
    {
      key: "max_bh_size",
      columns: [
        {
          title: "The maximum block header size (in bytes).",
        },
        {
          title: "max_bh_size",
        },
        {
          title: <p className='text-right'>{formatNumber(2000000)}</p>,
        },
      ],
    },
    {
      key: "key_deposit",
      columns: [
        {
          title:
            "The amount (in Lovelace) require for a deposit to register a StakeAddress.",
        },
        {
          title: "key_deposit",
        },
        {
          title: <p className='text-right'>{formatNumber(500000000)}</p>,
        },
      ],
    },
    {
      key: "pool_deposit",
      columns: [
        {
          title:
            "The amount (in Lovelace) require for a deposit to register a stake pool.",
        },
        {
          title: "pool_deposit",
        },
        {
          title: <p className='text-right'>{formatNumber(18)}</p>,
        },
      ],
    },
    {
      key: "max_epoch",
      columns: [
        {
          title:
            "The maximum number of epochs in the future that a pool retirement is allowed to be scheduled for.",
        },
        {
          title: "max_epoch",
        },
        {
          title: <p className='w-full text-right'>{formatNumber(500)}</p>,
        },
      ],
    },
    {
      key: "optimal_pool_count",
      columns: [
        {
          title: "The optimal number of stake pools.",
        },
        {
          title: "optimal_pool_count",
        },
        {
          title: <p className='text-right'>{formatNumber(0.3)}</p>,
        },
      ],
    },
    {
      key: "influence",
      columns: [
        {
          title:
            "The influence of the pledge on a stake pool's probability on minting a block.",
        },
        {
          title: "influence",
        },
        {
          title: <p className='w-full text-right'>{formatNumber(500)}</p>,
        },
      ],
    },
    {
      key: "monetary_expand_rate",
      columns: [
        {
          title: "The monetary expansion rate.",
        },
        {
          title: "monetary_expand_rate",
        },
        {
          title: <p className='text-right'>{formatNumber(0.0003)}</p>,
        },
      ],
    },
    {
      key: "treasury_growth_rate",
      columns: [
        {
          title: "The treasury growth rate.",
        },
        {
          title: "treasury_growth_rate",
        },
        {
          title: <p className='text-right'>{formatNumber(0.2)}</p>,
        },
      ],
    },
    {
      key: "decentralisation",
      columns: [
        {
          title:
            "The decentralisation parameter (1 fully centralised, 0 fully decentralised).",
        },
        {
          title: "decentralisation",
        },
        {
          title: <p className='text-right'>{formatNumber(0)}</p>,
        },
      ],
    },
    {
      key: "protocol_major",
      columns: [
        {
          title: "The protocol major number.",
        },
        {
          title: "protocol_major",
        },
        {
          title: <p className='w-full text-right'>{10}</p>,
        },
      ],
    },
    {
      key: "protocol_minor",
      columns: [
        {
          title: "The protocol minor number.",
        },
        {
          title: "protocol_minor",
        },
        {
          title: <p className='w-full text-right'>{0}</p>,
        },
      ],
    },
    {
      key: "min_utxo_value",
      columns: [
        {
          title: "The minimum value of a UTxO entry.",
        },
        {
          title: "min_utxo_value",
        },
        {
          title: <p className='w-full text-right'>{0}</p>,
        },
      ],
    },
    {
      key: "min_pool_cost",
      columns: [
        {
          title: "The minimum pool cost.",
        },
        {
          title: "min_pool_cost",
        },
        {
          title: <p className='text-right'>{formatNumber(170000000)}</p>,
        },
      ],
    },
    {
      key: "nonce",
      columns: [
        {
          title: "The nonce value for this epoch.",
        },
        {
          title: "nonce",
        },
        {
          title: (
            <p className='text-wrap break-words'>
              b42a8aa7b858d0f6e4c9675342809f78e8e24543477af80d5653eb68286f8094
            </p>
          ),
        },
      ],
    },
    {
      key: "price_mem",
      columns: [
        {
          title: "The per word cost of script memory usage.",
        },
        {
          title: "price_mem",
        },
        {
          title: <p className='w-full text-right'>{0.0577}</p>,
        },
      ],
    },
    {
      key: "price_step",
      columns: [
        {
          title: "The cost of script execution step usage.",
        },
        {
          title: "price_step",
        },
        {
          title: <p className='w-full text-right'>{0.0000721}</p>,
        },
      ],
    },
    {
      key: "max_tx_ex_mem",
      columns: [
        {
          title:
            "The maximum number of execution memory allowed to be used in a single transaction.",
        },
        {
          title: "max_tx_ex_mem",
        },
        {
          title: <p className='text-right'>{formatNumber(14000000)}</p>,
        },
      ],
    },
    {
      key: "max_tx_ex_steps",
      columns: [
        {
          title:
            "The maximum number of execution steps allowed to be used in a single transaction.",
        },
        {
          title: "max_tx_ex_steps",
        },
        {
          title: <p className='text-right'>{formatNumber(10000000000)}</p>,
        },
      ],
    },
    {
      key: "max_block_ex_mem",
      columns: [
        {
          title:
            "The maximum number of execution memory allowed to be used in a single block.",
        },
        {
          title: "max_block_ex_mem",
        },
        {
          title: <p className='text-right'>{formatNumber(62000000)}</p>,
        },
      ],
    },
    {
      key: "max_block_ex_steps",
      columns: [
        {
          title:
            "The maximum number of execution steps allowed to be used in a single block.",
        },
        {
          title: "max_block_ex_steps",
        },
        {
          title: <p className='text-right'>{formatNumber(20000000000)}</p>,
        },
      ],
    },
    {
      key: "max_val_size",
      columns: [
        {
          title: "The maximum Val size.",
        },
        {
          title: "max_val_size",
        },
        {
          title: <p className='text-right'>{formatNumber(5000)}</p>,
        },
      ],
    },
    {
      key: "collateral_percent",
      columns: [
        {
          title:
            "The percentage of the txfee which must be provided as collateral when including non-native scripts.",
        },
        {
          title: "collateral_percent",
        },
        {
          title: <p className='text-right'>{formatNumber(150)}</p>,
        },
      ],
    },
    {
      key: "max_collateral_inputs",
      columns: [
        {
          title:
            "The maximum number of collateral inputs allowed in a transaction.",
        },
        {
          title: "max_collateral_inputs",
        },
        {
          title: <p className='text-right'>{formatNumber(3)}</p>,
        },
      ],
    },
  ];

  return (
    <>
      <div className='flex w-full items-center justify-between gap-1 pt-1'>
        <h3 className='basis-[220px]'>Epoch Parameters</h3>
        <div className='curspor-pointer flex h-[40px] w-fit shrink-0 items-center justify-center gap-1/2 rounded-s border border-border px-1.5'>
          <Download size={20} className='text-text' />
          <span className='text-text-sm font-medium'>Export</span>
        </div>
      </div>
      <div className='thin-scrollbar relative mt-3 w-full max-w-desktop -scale-100 overflow-x-auto rounded-l border border-border [&>div]:w-full'>
        <Table className='thin-scrollbar -scale-100' minwidth={1300}>
          <TableHeader className='border-none bg-darker'>
            <TableRow>
              {tableHeader.map(({ key, title, width }) => (
                <Fragment key={key}>
                  <TableHead
                    style={{
                      maxWidth: `${width}px`,
                      width: `${width}px`,
                    }}
                    className='table-cell font-semibold first:pl-4 last:pr-4'
                  >
                    {title}
                  </TableHead>
                </Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ key, columns }, index) => (
              <TableRow
                className={`${index % 2 !== 0 ? "bg-darker" : ""} h-[55px] w-[55px]`}
                key={key}
              >
                {columns.map(({ title }, index) => (
                  <TableCell
                    key={index}
                    style={{
                      width: tableHeader[index].width,
                      maxWidth: tableHeader[index].width,
                    }}
                    className={`table-cell h-[55px] py-1.5 text-left first:pl-4 last:pr-4 [&>a]:text-primary`}
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
