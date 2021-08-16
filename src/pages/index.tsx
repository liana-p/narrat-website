import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { IndexQuery } from "../../graphql-types";
import NarratHero from "../components/narrat-hero";
import { Container, Flex, Link } from "theme-ui";

interface IndexProps {
  data: IndexQuery;
  location: Location;
}
const IndexPage: React.FC<IndexProps> = ({ data, location }) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <NarratHero />
      <Flex
        sx={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h1>Interactive Demo</h1>
        <p>
          <Link href="http://get-narrat.com/demo/" target="_blank">
            (Open in a new tab)
          </Link>
        </p>
        <p>reload the page in a bigger window if too small)</p>
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          boxSizing: "border-box",
          px: "20px",
        }}
      >
        <iframe
          src="/demo/"
          title="Narrat demo"
          width="100%"
          height="100%"
        ></iframe>
      </Flex>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;
