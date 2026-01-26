import type { FC } from "react";
import type { PoolCert } from "@/services/pool";

import { TableList } from "@/components/global/TableList";
import { Link } from "@tanstack/react-router";
import { AdaWithTooltip } from "@vellumlabs/cexplorer-sdk/AdaWithTooltip";
import { Copy } from "@vellumlabs/cexplorer-sdk/Copy";
import { EpochCell } from "@vellumlabs/cexplorer-sdk/EpochCell";
import { formatString } from "@vellumlabs/cexplorer-sdk/Format";
import { Download } from "lucide-react";
import { Tooltip } from "@vellumlabs/cexplorer-sdk/Tooltip";
import {
  useFetchPoolRelays,
  useFetchPoolUpdates,
  useFetchPoolRetires,
} from "@/services/pool";

interface AboutTabProps {
  certs?: PoolCert[];
  hashId?: number;
  isLoading?: boolean;
}

export const AboutTab: FC<AboutTabProps> = ({ certs, hashId, isLoading }) => {
  const { data: relaysData, isLoading: relaysLoading } =
    useFetchPoolRelays(hashId);
  const { data: updatesData, isLoading: updatesLoading } =
    useFetchPoolUpdates(hashId);
  const { data: retiresData, isLoading: retiresLoading } =
    useFetchPoolRetires(hashId);

  const latestCert = certs?.[0];
  const owners = latestCert?.owners ?? [];
  const rewardAddr = latestCert?.reward_addr_view ?? "";

  const relays = relaysData?.pool_relay ?? [];
  const updates = updatesData?.pool_update ?? [];
  const retires = retiresData?.pool_retire ?? [];

  const ownerColumns = [
    {
      key: "address",
      render: item => {
        const view = item as string;
        return (
          <div className='flex items-center gap-1'>
            <Link
              to='/stake/$stakeAddr'
              params={{ stakeAddr: view }}
              className='text-primary'
            >
              {formatString(view, "longer")}
            </Link>
            <Copy copyText={view} />
          </div>
        );
      },
      title: "Address",
      widthPx: 100,
    },
  ];

  const rewardsColumns = [
    {
      key: "address",
      render: item => {
        const view = item as string;
        return (
          <div className='flex items-center gap-1'>
            <Link
              to='/stake/$stakeAddr'
              params={{ stakeAddr: view }}
              className='text-primary'
            >
              {formatString(view, "longer")}
            </Link>
            <Copy copyText={view} />
          </div>
        );
      },
      title: "Address",
      widthPx: 100,
    },
  ];

  const relayColumns = [
    {
      key: "address",
      render: item => {
        const address = item.dns_name || item.ipv4 || item.ipv6 || "-";
        return <p>{address}</p>;
      },
      title: "Address",
      widthPx: 150,
    },
    {
      key: "port",
      render: item => <p className='text-right'>{item.port ?? "-"}</p>,
      title: <p className='w-full text-right'>Port</p>,
      widthPx: 50,
    },
  ];

  const certificatesColumns = [
    {
      key: "active_in",
      render: item => <EpochCell no={item.active_epoch_no} justify='start' />,
      title: "Active in",
      widthPx: 30,
    },
    {
      key: "rewards_address",
      render: item => {
        const view = item.reward_addr?.view;
        if (!view) return <span>-</span>;
        return (
          <Link
            className='text-primary'
            to='/stake/$stakeAddr'
            params={{ stakeAddr: view }}
          >
            {formatString(view, "long")}
          </Link>
        );
      },
      title: "Rewards Address",
      widthPx: 60,
    },
    {
      key: "params",
      render: item => {
        return (
          <div className='flex flex-col text-text-xs'>
            <span>
              Pledge: <AdaWithTooltip data={Number(item.pledge ?? 0)} />
            </span>
            <span>
              Fixed: <AdaWithTooltip data={Number(item.fixed_cost ?? 0)} />
            </span>
            <span>Margin: {((item.margin ?? 0) * 100).toFixed(2)}%</span>
          </div>
        );
      },
      title: "Params",
      widthPx: 50,
    },
    {
      key: "metadata",
      render: item => {
        if (!item.meta) return <span className='text-right'>-</span>;
        return (
          <div className='flex flex-col items-end'>
            <Tooltip content={item.meta.url}>
              <a
                href={item.meta.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex w-fit cursor-pointer items-center justify-end gap-1/2'
              >
                <Download className='text-primary' size={11} />
                <span className='text-primary'>Download</span>
              </a>
            </Tooltip>
            <div className='flex items-center justify-end gap-1/2'>
              <span className='text-text-xs'>
                {formatString(item.meta.hash, "long")}
              </span>
              <Copy copyText={item.meta.hash} size={11} />
            </div>
          </div>
        );
      },
      title: <p className='w-full text-right'>Metadata</p>,
      widthPx: 60,
    },
  ];

  const retirementColumns = [
    {
      key: "epoch",
      render: item => <EpochCell no={item.retiring_epoch} justify='start' />,
      title: "Retiring Epoch",
      widthPx: 50,
    },
  ];

  return (
    <div className='flex flex-col gap-2'>
      {owners.length > 0 && (
        <TableList
          columns={ownerColumns}
          title='Owners'
          withPadding={false}
          items={owners}
          loading={isLoading}
          showMoreButton={false}
        />
      )}
      {rewardAddr && (
        <TableList
          columns={rewardsColumns}
          title='Rewards Address'
          withPadding={false}
          items={[rewardAddr]}
          loading={isLoading}
          showMoreButton={false}
        />
      )}
      {relays.length > 0 && (
        <TableList
          columns={relayColumns}
          title='Relays'
          withPadding={false}
          items={relays}
          loading={relaysLoading}
          showMoreButton={false}
        />
      )}
      {updates.length > 0 && (
        <TableList
          columns={certificatesColumns}
          title='Pool Certificates'
          withPadding={false}
          items={updates}
          loading={updatesLoading}
          showMoreButton={false}
        />
      )}
      {retires.length > 0 && (
        <TableList
          columns={retirementColumns}
          title='Retirement'
          withPadding={false}
          items={retires}
          loading={retiresLoading}
          showMoreButton={false}
        />
      )}
    </div>
  );
};
