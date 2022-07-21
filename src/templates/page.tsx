/** @jsxImportSource theme-ui */

import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
// import { PageBySlugQuery } from "../../graphql-types"
import { MDXRenderer } from "gatsby-plugin-mdx";
import { PageBySlugQuery } from "../../graphql-types";
import { Box, Container, Heading } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { getCanonicalUrl } from "../helpers/url-helpers";
import { MDXProvider } from "@mdx-js/react";
import { shortcodes } from "../helpers/componentShortcodes";
import { featuredImage } from "../helpers/featured-image";

interface PageProps {
  data: PageBySlugQuery;
  location: Location;
}
const PageTemplate: React.FC<PageProps> = ({ data, location }) => {
  const metadata = useSiteMetadata();
  const post = data.mdx!;
  const canonicalUrl = getCanonicalUrl(metadata.siteUrl!, post.fields!.slug!);
  const title = post.frontmatter!.title;
  if (!data.mdx || !data.mdx.frontmatter) {
    return <h1>No article</h1>;
  }
  let imageUrl;
  imageUrl = featuredImage(data.mdx.frontmatter.featuredImage as any);
  return (
    <Layout
      location={location}
      pageTitle={title}
      imageUrl={imageUrl}
      canonicalUrl={canonicalUrl}
      description={post!.frontmatter!.description || post!.excerpt}
    >
      <Container
        px={20}
        // bg="muted"
        sx={{
          maxWidth: [768, 768, 768, 900],
          mx: "auto",
          variant: "layout.container",
        }}
      >
        <MDXProvider components={shortcodes}>
          <Box as={"article"} itemScope itemType="http://schema.org/Article">
            <header>
              <Heading
                itemProp="headline"
                sx={{
                  variant: "headings.articleHeading",
                  fontSize: "xxxl",
                  mt: "l",
                }}
              >
                {title}
              </Heading>
            </header>
            <MDXRenderer>{post.body}</MDXRenderer>
            <hr />
          </Box>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        featuredImage {
          publicURL
        }
      }
    }
  }
`;
