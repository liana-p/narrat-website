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
    <Layout
      location={location}
      title={data.site.siteMetadata.title}
      beforeContainer={<NarratHero />}
    >
      <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
        <h1>Interactive Demo</h1>
        <iframe
          src="/demo/"
          title="Narrat demo"
          width="100%"
          height="400px"
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
