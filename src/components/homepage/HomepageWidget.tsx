import type { Column } from "../global/TableList";
import { Fragment, memo, type FC } from "react";

import { ArrowRight } from "lucide-react";

import { Link, type FileRoutesByPath } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vellumlabs/cexplorer-sdk/GlobalTable/Components";

interface HomepageWidgetProps {
  title: string;
  linkTitle: string;
  link: FileRoutesByPath[keyof FileRoutesByPath]["path"];
  items: Record<string, any>[];
  columns: Column<Record<string, unknown>>[];
}

const MemoCell = memo(function MemoizedCell({ children, ...props }: any) {
  return <TableCell {...props}>{children}</TableCell>;
});

export const HomepageWidget: FC<HomepageWidgetProps> = ({
  link,
  linkTitle,
  title,
  columns,
  items,
}) => {
  return (
    <div className='rounded-m border border-border bg-background max-[1000px]:w-full'>
      <div className='relative h-[650px] max-[1000px]:w-full min-[1000px]:w-[686px]'>
        <div className='relative flex h-[50px] items-center justify-between border-b border-border px-1.5'>
          <span className='text-text-lg font-semibold'>{title}</span>
          <Link to={link}>
            <div className='flex items-center gap-1/2'>
              <span className='text-text-sm font-semibold text-primary'>
                {linkTitle}
              </span>
              <ArrowRight size={15} className='text-primary' />
            </div>
          </Link>
        </div>
        <div
          className={`thin-scrollbar h-[calc(100%-130px)] w-full overflow-y-auto`}
          onMouseDown={e => {
            e.stopPropagation();
          }}
        >
          <div
            className={`thin-scrollbar relative w-full max-w-desktop overflow-x-hidden [&>div]:w-full`}
            style={{
              transform: "rotateX(180deg)",
            }}
          >
            <Table
              style={{
                transform: "rotateX(180deg)",
                minWidth: `100px`,
              }}
              className='thin-scrollbar border-separate border-spacing-0 transition-all duration-300'
            >
              <TableHeader className={`"relative top-0 z-10`}>
                <tr className=''>
                  {columns.map(({ title, key, widthPx, visible }) => (
                    <Fragment key={key}>
                      {visible && (
                        <TableHead
                          draggable
                          style={{
                            maxWidth: `${widthPx || 200}px`,
                            width: `${widthPx}px`,
                          }}
                          className={`relative box-border table-cell bg-darker font-semibold first:pl-4 last:pr-4`}
                        >
                          {title}
                        </TableHead>
                      )}
                    </Fragment>
                  ))}
                </tr>
              </TableHeader>
              <TableBody className='text-grayTextPrimary'>
                {items?.map((item, index) => (
                  <TableRow
                    style={{
                      height: `49px`,
                      maxHeight: `49px`,
                    }}
                    key={index}
                    className={`${index % 2 !== 0 ? "bg-darker" : ""} group duration-150`}
                  >
                    {columns.map(
                      ({
                        key,
                        widthPx,
                        render,
                        visible,
                        className,
                        standByRanking,
                        rankingStart,
                      }) => (
                        <Fragment key={key}>
                          {visible && (
                            <MemoCell
                              style={{
                                maxWidth: `${widthPx || 100}px`,
                                width: `${widthPx || 100}px`,
                                height: `49px`,
                                maxHeight: `49px`,
                              }}
                              className={`table-cell py-1 text-left duration-200 first:pl-4 last:pr-4 group-hover:bg-tableHover ${className}`}
                            >
                              {!standByRanking
                                ? item && render(item)
                                : rankingStart === "asc"
                                  ? 10 - index
                                  : 10 * (1 - 1) + index + 1}
                            </MemoCell>
                          )}
                        </Fragment>
                      ),
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
