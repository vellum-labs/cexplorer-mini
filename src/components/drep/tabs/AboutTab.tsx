import type { FC } from "react";

import { Link } from "@tanstack/react-router";
import { Copy } from "@vellumlabs/cexplorer-sdk";

interface AboutTabProps {
  data: Record<string, string>;
}

export const AboutTab: FC<AboutTabProps> = ({ data }) => {
  const entries = Object.entries(data);

  return (
    <section className='flex w-full flex-col overflow-hidden rounded-xl border border-border'>
      {entries.map(([key, value], index) => {
        const title = key
          .split("_")
          .map((w, i) => (i === 0 ? w[0]?.toUpperCase() + w.slice(1) : w))
          .join(" ");

        const isAddress = value.startsWith("addr");

        return (
          <div
            key={key + "-" + index}
            className={`flex min-h-[55px] flex-col gap-3 px-4 py-3 text-left md:flex-row md:items-center ${index % 2 !== 0 ? "bg-darker" : ""} ${index !== entries.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className='min-w-[150px] text-text-sm font-medium text-grayTextPrimary'>
              {title}
            </span>

            {!value || value.trim() === "" ? (
              <span className='text-text-sm text-grayTextPrimary'>-</span>
            ) : isAddress ? (
              <div className='flex w-full items-center gap-2'>
                <Link
                  to='/address/$address'
                  params={{ address: value }}
                  className='break-all text-text-sm text-primary'
                >
                  {value}
                </Link>
                <Copy copyText={value} />
              </div>
            ) : (
              <div className='w-full break-words text-text-sm'>{value}</div>
            )}
          </div>
        );
      })}
    </section>
  );
};
