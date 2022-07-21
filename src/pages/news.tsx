import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Container } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { usePosts } from "../hooks/use-news";
import { NewsPageQuery } from "../../graphql-types";
import { NewsFull } from "../components/news-full";

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
      canonicalUrl={`${metadata.siteUrl!}/news`}
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
        <NewsFull news={posts} />
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
