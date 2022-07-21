/** @jsxImportSource theme-ui */

import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import { BlogPostBySlugQuery } from "../../graphql-types";
import { MDXRenderer } from "gatsby-plugin-mdx";
import RouteLink from "../components/route-link";
import { Avatar, Box, Container, Flex, Heading, Text } from "theme-ui";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { getCanonicalUrl, getNewsUrl } from "../helpers/url-helpers";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { shortcodes } from "../helpers/componentShortcodes";
import { MDXProvider } from "@mdx-js/react";

interface BlogPostProps {
  data: BlogPostBySlugQuery;
  location: Location;
}
const BlogPostTemplate: React.FC<BlogPostProps> = ({ data, location }) => {
  const metadata = useSiteMetadata();
  const post = data.mdx!;
  const { previous, next } = data;
  const canonicalUrl = getNewsUrl(metadata.siteUrl!, post.fields!.slug!);
  const title = post.frontmatter!.title;
  return (
    <Layout
      location={location}
      pageTitle={title}
      canonicalUrl={canonicalUrl}
      description={post.frontmatter!.description || post.excerpt}
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
          <Box
            as={"article"}
            className="news-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              {/* {post.frontmatter.featuredImage && (
                <GatsbyImage
                  image={getImage((post.frontmatter as any).featuredImage!)!}
                  alt="article-hero"
                  sx={{ variant: "images.hero" }}
                />
              )} */}
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
              <Box sx={{ my: "l", variant: "boxes.verticalSeparated" }}>
                <Flex sx={{ alignItems: "center" }}>
                  <Flex
                    sx={{
                      flexDirection: "column",
                      ml: "l",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* <Heading as="h2">{metadata?.author?.name}</Heading> */}
                    <Text>
                      Published on <b>{post.frontmatter!.date}</b>
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </header>
            <MDXRenderer>{post.body}</MDXRenderer>
            <hr />
            {/* <footer>
              <Bio />
            </footer> */}
          </Box>
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <p>
                    Previous Article: {` `}
                    <RouteLink to={`/${previous.fields.slug}`} rel="prev">
                      ← {previous.frontmatter.title}
                    </RouteLink>
                  </p>
                )}
              </li>
              <li>
                {next && (
                  <p>
                    Next Article:{` `}
                    <RouteLink to={`/${next.fields.slug}`} rel="next">
                      {next.frontmatter.title} →
                    </RouteLink>
                  </p>
                )}
              </li>
            </ul>
          </nav>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
