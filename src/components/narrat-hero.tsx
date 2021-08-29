/** @jsxImportSource theme-ui */

import * as React from "react";
import { Box, Flex, Grid, Heading } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import ButtonLink from "./button-link";

export interface NarratHeroProps {}
const NarratHero: React.FC<NarratHeroProps> = ({}) => {
  const metadata = useSiteMetadata();
  return (
    <Box sx={{ p: "xl", bg: "highlight", width: "100%" }}>
      <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
        <Heading
          as="h1"
          sx={{ variant: "textStyles.display", mb: "m", fontSize: "6rem" }}
        >
          {metadata.title}
        </Heading>
        <Heading as="h2" sx={{ variant: "textStyles.subtitle", mt: "s" }}>
          {metadata.description}
        </Heading>
        <Grid gap={20} columns={[1, 3]} sx={{ mt: "m" }}>
          <ButtonLink
            link="https://docs.get-narrat.com/getting-started"
            title="Get Started"
            sx={{ width: "100%" }}
            rel="noopener"
            target="_blank"
          />
          <ButtonLink
            link="https://docs.get-narrat.com"
            title="Docs"
            sx={{ width: "100%" }}
            rel="noopener"
            target="_blank"
          />
          <ButtonLink
            link="https://get-narrat.com/demo/"
            title="Demo"
            sx={{ width: "100%" }}
            rel="noopener"
            target="_blank"
          />
        </Grid>
      </Flex>
    </Box>
  );
};

export default NarratHero;
