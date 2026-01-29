import type { FileRoutesByPath } from "@tanstack/react-router";
import type { FC } from "react";

import { Link } from "@tanstack/react-router";

interface FooterLinks {
  label: string;
  href?: string;
  target?: "_self" | "_blank";
}

interface LinksColumnProps {
  header: string;
  links: FooterLinks[];
}

export const LinksColumn: FC<LinksColumnProps> = ({ header, links }) => {
  return (
    <div className='flex flex-col gap-1'>
      <p className='text-[12px] text-grayTextPrimary'>{header}</p>
      {links.map((link, index) => (
        <Link
          to={link.href as FileRoutesByPath[keyof FileRoutesByPath]["path"]}
          key={index}
          target={link.target}
          className='text-text-sm font-medium'
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
