/** @jsxImportSource theme-ui */

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export interface SeoProps {
  description?: string;
  lang?: string;
  meta?: any;
  imageUrl?: string;
  canonicalUrl: string;
  title?: string;
  contentType?: "article" | "website";
}
const Seo: React.FC<SeoProps> = ({
  description,
  lang,
  meta,
  title,
  imageUrl,
  canonicalUrl,
  contentType,
}) => {
  const metadata = useSiteMetadata();

  const metaDescription = description || metadata?.description;
  const defaultTitle = metadata?.title;
  contentType = contentType || "website";
  imageUrl = imageUrl || metadata.siteImage;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || defaultTitle}
      // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: "og:site_name",
          content: metadata.title,
        },
        {
          property: "og:image",
          content: imageUrl,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        {
          name: `twitter:card`,
          content: "summary_large_image",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: "twitter:site",
          content: "@NarratEngine",
        },
        {
          name: "twitter:image",
          content: imageUrl,
        },
        {
          name: "twitter:image:alt",
          content: "Narrat website logo",
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Seo;
