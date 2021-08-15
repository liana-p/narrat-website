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
        <Grid gap={20} columns={[1, 2]} sx={{ mt: "m" }}>
          <ButtonLink
            link="https://docs.get-narrat.com"
            title="Get Started"
            sx={{ width: "100%" }}
          />
          <ButtonLink
            link="https://docs.get-narrat.com"
            title="Docs"
            sx={{ width: "100%" }}
          />
        </Grid>
      </Flex>
    </Box>
  );
};

export default NarratHero;
