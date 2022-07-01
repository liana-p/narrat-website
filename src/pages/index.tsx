import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { IndexQuery } from "../../graphql-types";
import NarratHero from "../components/narrat-hero";
import { Badge, Box, Container, Grid, Heading } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import RouteLink from "../components/route-link";
import { usePosts } from "../hooks/use-news";
import { NewsList } from "../components/news-list";
import { NarratCodeIllustration } from "../components/narrat-code-illustration";
import { FeatureHero } from "../components/feature-hero";
import { IconTitleDesc } from "../components/icons-title-desc";
import { FaGamepad, FaGithub } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

const shortcodes = {};
interface IndexProps {
  data: IndexQuery;
  location: Location;
}
const IndexPage: React.FC<IndexProps> = ({ data, location }) => {
  const metadata = useSiteMetadata();
  const canonicalUrl = metadata.siteUrl;
  // const posts = data.posts.nodes;
  return (
    <Layout
      location={location}
      pageTitle={metadata.title!}
      canonicalUrl={canonicalUrl!}
    >
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
        <Grid gap={60} columns={[1, 2, 3]}>
          <FeatureHero
            title={"Skills"}
            subtitle="Level Up"
            explanation={"To pass or fail skill tests"}
          />
          <FeatureHero
            title={"Quests"}
            subtitle="Complete Objectives"
            explanation={"With a dynamic quest log"}
          />
          <FeatureHero
            title={"Inventory"}
            subtitle="Collect Items"
            explanation={"with the inventory feature"}
          />
        </Grid>
        <NarratCodeIllustration />
        <Grid gap={60} columns={[1, 2, 3]}>
          <IconTitleDesc
            icon={<FaGithub></FaGithub>}
            title="Narrat Template"
            explanation="A template for narrat game dev, ready to go."
            link="https://github.com/liana-p/narrat-template"
            linkTitle="Get the template"
          />
          <IconTitleDesc
            icon={<BsPencil />}
            title="Narrat Scripts"
            explanation="Edit narrat script files to write your game."
            link="https://docs.get-narrat.com/guides/customising-your-narrat-game"
            linkTitle="Learn how"
          />
          <IconTitleDesc
            icon={<FaGamepad />}
            title="Game"
            explanation="That's all you need to make a game. Ready to publish"
            link="https://docs.get-narrat.com/guides/building-and-exporting-your-game"
            linkTitle="Export your game"
          />
        </Grid>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{data.mdx!.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Index {
    mdx(fields: { slug: { eq: "narrat" } }) {
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
