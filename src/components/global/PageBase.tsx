import type { FC, ReactNode } from "react";

import { Helmet } from "react-helmet";
import { Header, type HeaderProps } from "@vellumlabs/cexplorer-sdk";

import metadata from "../../../conf/en-metadata.json";

interface PageBaseInitProps {
  children: ReactNode;
  metadataReplace?: {
    before: string;
    after: string;
  };
  title: ReactNode;
  breadcrumbItems?: HeaderProps["breadcrumbItems"];
  breadcrumbSeparator?: ReactNode;
  subTitle?: ReactNode;
  badge?: ReactNode;
  qrCode?: ReactNode;
  icon?: ReactNode;
  showHeader?: boolean;
  showMetadata?: boolean;
  isHomepage?: boolean;
  homepageAd?: ReactNode;
  customPage?: boolean;
  withoutSearch?: boolean;
}

interface PageWithSimpleMetadata extends PageBaseInitProps {
  metadataTitle: string;
  metadataOverride?: never;
}

interface PageWithCustomMetadata extends PageBaseInitProps {
  metadataTitle?: never;
  metadataOverride: {
    title: string;
  };
}

type PageBaseProps = PageWithSimpleMetadata | PageWithCustomMetadata;

export const PageBase: FC<PageBaseProps> = ({
  children,
  metadataTitle,
  title,
  breadcrumbItems,
  metadataReplace,
  badge,
  qrCode,
  icon,
  subTitle,
  breadcrumbSeparator,
  metadataOverride,
  showHeader = true,
  showMetadata = true,
  isHomepage,
  homepageAd,
  customPage,
  withoutSearch = false,
}) => {
  const metadataTitleInit = metadataOverride
    ? metadataOverride?.title
    : metadataReplace
      ? metadata[metadataTitle]?.title.replace(
          metadataReplace?.before,
          metadataReplace?.after || "",
        )
      : metadata[metadataTitle]?.title;

  return (
    <main className='flex min-h-minHeight w-full flex-col items-center'>
      {showMetadata && (
        <Helmet>
          <title>{metadataTitleInit}</title>
        </Helmet>
      )}
      {showHeader && (
        <Header
          title={title}
          badge={badge}
          breadcrumbItems={breadcrumbItems}
          breadcrumbSeparator={breadcrumbSeparator}
          isHomepage={isHomepage}
          qrCode={qrCode}
          subTitle={subTitle}
          homepageAd={homepageAd}
          customPage={customPage}
          icon={icon}
          withoutSearch={withoutSearch}
          shareButton={false}
        />
      )}
      {children}
    </main>
  );
};
