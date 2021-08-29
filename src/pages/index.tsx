import * as React from "react";
import { graphql } from "gatsby"
import Layout from "../components/layout";
import { IndexPageQuery } from "../../graphql-types";
import NarratHero from "../components/narrat-hero";
import { Container, Flex, Link } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

const shortcodes = {  }
interface IndexProps {
  data: IndexPageQuery
  location: Location;
}
const IndexPage: React.FC<IndexProps> = ({ data, location }) => {
  const metadata = useSiteMetadata();
  const canonicalUrl = metadata.siteUrl;
  return (
    <Layout location={location} pageTitle={metadata.title}
    canonicalUrl={canonicalUrl}>
      <NarratHero />
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
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    mdx(fields: {slug: {eq: "narrat"}}) {
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
