/** @jsxImportSource theme-ui */

import * as React from "react";
import { Box, Flex, Grid, Heading, Link, Paragraph, Text } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import ButtonLink from "./button-link";

export interface NarratHeroProps {}
const NarratHero: React.FC<NarratHeroProps> = ({}) => {
  const metadata = useSiteMetadata();
  return (
    <Box sx={{ p: "xl", width: "100%" }}>
      <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
        <Grid gap={40} columns={[1, "1.5fr 2fr"]} sx={{ mt: "m" }}>
          <Box>
            <Heading as="h1" sx={{ variant: "textStyles.display", mb: "m" }}>
              Make <Text variant="textStyles.accent">narrative RPGs</Text> for
              web and desktop easily
            </Heading>
            <Paragraph sx={{ my: "l" }}>
              {metadata.description}. Create your game by editing with a{" "}
              <b>Simple scripting</b> syntax. It supports <b>Skills</b> with
              skill check rolls, an <b>Items</b> inventory, and has a
              <b> Quests System</b>. The script system is very powerful and
              allows <b>branching choices</b>, functions, variables and
              conditions.
            </Paragraph>
            <Box sx={{ mt: "m" }}>
              <ButtonLink
                link="https://docs.get-narrat.com/getting-started"
                title="Get Started"
                rel="noopener"
                target="_blank"
                sx={{ mr: "m" }}
              />
              <Link
                href="https://get-narrat.com/demo/"
                title="Demo"
                sx={{ width: "100%" }}
                rel="noopener"
                target="_blank"
              >
                Play a demo
              </Link>
            </Box>
          </Box>
          <Box>
            <video
              autoPlay
              muted
              sx={{ position: "relative", width: "100%" }}
              loop
            >
              <source src="video/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
};

export default NarratHero;
