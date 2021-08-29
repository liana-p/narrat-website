/** @jsxImportSource theme-ui */

import * as React from "react";
import { Container } from "theme-ui";
import TopNav from "./top-nav";
import Seo from "./seo";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export interface LayoutProps {
  location: Location
  pageTitle?: string
  description?: string
  canonicalUrl: string
  imageUrl?: string
  contentType?: 'article' | 'website'
}
const Layout: React.FC<LayoutProps> = ({
  location,
  pageTitle,
  children,
  description,
  canonicalUrl,
  imageUrl,
  contentType,
}) => {
  const metadata = useSiteMetadata();
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header = <TopNav location={location} title={metadata.title} />;

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        // set this to `minHeight: '100vh'` for full viewport height
        minHeight: 256,
        variant: "layout.root",
      }}
    >
      <Seo title={pageTitle} description={description} canonicalUrl={canonicalUrl}
        imageUrl={imageUrl} contentType={contentType}/>
      <header
        sx={{
          width: "100%",
          variant: "layout.header",
        }}
      >
        {header}
      </header>
      <main
        sx={{
          width: "100%",
          flex: "1 1 auto",
          variant: "layout.main",
        }}
      >
        {children}
        {/* {beforeContainer}
        <Container
          px={20}
          // bg="muted"
          sx={{
            maxWidth: [768, 768, 768, 900],
            mx: "auto",
            variant: "layout.container",
          }}
        >
          {children}
        </Container> */}
      </main>
      <footer
        sx={{
          mt: "l",
          width: "100%",
          variant: "layout.footer",
        }}
      ></footer>
    </div>
    // <div className="global-wrapper" data-is-root-path={isRootPath}>
    //   <header className="global-header">{header}</header>
    //   <main>{children}</main>
    //   <footer>
    //     © {new Date().getFullYear()}, Built with
    //     {` `}
    //     <a href="https://www.gatsbyjs.com">Gatsby</a>
    //   </footer>
    // </div>
  );
};

export default Layout;
