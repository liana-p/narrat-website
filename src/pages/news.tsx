import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Badge, Box, Container, Heading } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import RouteLink from "../components/route-link";
import { usePosts } from "../hooks/use-news";
import { NewsPageQuery } from "../../graphql-types";
import { NewsList } from "../components/news-list";

const shortcodes = {};
interface IndexProps {
  data: NewsPageQuery;
  location: Location;
}
const IndexPage: React.FC<IndexProps> = ({ data, location }) => {
  const metadata = useSiteMetadata();
  const posts = usePosts().nodes;
  const canonicalUrl = metadata.siteUrl;
  // const posts = data.posts.nodes;
  return (
    <Layout
      location={location}
      pageTitle={metadata.title!}
      canonicalUrl={canonicalUrl!}
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
          <MDXRenderer>{data.mdx!.body}</MDXRenderer>
        </MDXProvider>
        <NewsList news={posts} />
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query NewsPage {
    mdx(fields: { slug: { eq: "narrat-news" } }) {
      excerpt(pruneLength: 160)
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
  }
`;

export default IndexPage;
