import type { FileRoutesByPath } from "@tanstack/react-router";

import { formatString } from "@vellumlabs/cexplorer-sdk";
import { Link } from "@tanstack/react-router";
import { Copy } from "@vellumlabs/cexplorer-sdk";

export const HashCell = ({
  hash,
  enableHover = false,
  href,
  formatType = "long",
}: {
  hash: string;
  enableHover?: boolean;
  href?: FileRoutesByPath[keyof FileRoutesByPath]["path"];
  formatType?: "short" | "long" | "shorter" | "longer";
}) => {
  if (!hash) return "-";

  return (
    <div className='flex items-center gap-1'>
      <Link
        to={href || "/tx/$hash"}
        params={{ hash: hash }}
        className={`block overflow-hidden overflow-ellipsis whitespace-nowrap ${enableHover ? "px-1/2" : "px-0"}text-text-sm text-primary`}
      >
        {formatString(hash, formatType)}
      </Link>
      <Copy copyText={hash} />
    </div>
  );
};
