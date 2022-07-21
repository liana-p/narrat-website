import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { IndexQuery } from "../../graphql-types";
import NarratHero from "../components/narrat-hero";
import { Container, Grid } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { NarratCodeIllustration } from "../components/narrat-code-illustration";
import { FeatureHero } from "../components/feature-hero";
import { IconTitleDesc } from "../components/icons-title-desc";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { shortcodes } from "../helpers/componentShortcodes";
import { useNewsList } from "../hooks/use-news-list";
import { NewsList } from "../components/news/news-list";

interface IndexProps {
  data: IndexQuery;
  location: Location;
}
const IndexPage: React.FC<IndexProps> = ({ data, location }) => {
  const metadata = useSiteMetadata();
  const canonicalUrl = metadata.siteUrl;
  const news = useNewsList().nodes;
  if (!data.mdx || !data.mdx.frontmatter) {
    return <h1>No article</h1>;
  }
  return (
    <Layout location={location} canonicalUrl={canonicalUrl!}>
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
            icon={<FaDiscord />}
            title="Community"
            explanation="Get help, discuss narrat or suggest features."
            link="https://discord.gg/Xgz7EQ2Xgh"
            linkTitle="Join the discord"
          />
        </Grid>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{data.mdx!.body}</MDXRenderer>
        </MDXProvider>
        <NewsList news={news} />
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
