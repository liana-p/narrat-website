import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { IndexQuery } from "../../graphql-types";
import NarratHero from "../components/narrat-hero";
import { Flex } from "theme-ui";

interface IndexProps {
  data: IndexQuery;
  location: Location;
}
const IndexPage: React.FC<IndexProps> = ({ data, location }) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <NarratHero />
      <h1>Interactive Demo</h1>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          boxSizing: "border-box",
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
