/** @jsxImportSource theme-ui */
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Box, Grid, Heading, Image, Paragraph } from "theme-ui";

export const NarratCodeIllustration: React.FC = () => {
  return (
    <Box>
      <Heading as="h1" sx={{ mt: "xl", mb: "m" }}>
        How does it work?
      </Heading>
      <Paragraph>
        Narrat games are made by writing narrat scripts. Narrat scripts use a
        simple and approachable scripting language that is designed for writing
        interactive RPGs. No need to write complicated code, just write your
        story.
      </Paragraph>
      <Grid gap={20} columns={[1, "1.7fr 1fr"]} sx={{ my: "l" }}>
        <Box>
          <Heading as="h2" sx={{ my: "m" }}>
            Code Example
          </Heading>
          <StaticImage src="./code-example.jpg" alt="code example" />
        </Box>
        <Box sx={{ position: "relative" }}>
          <Heading as="h2" sx={{ my: "m" }}>
            Result in game
          </Heading>
          <img
            sx={{ width: "100%" }}
            src="narrat-example-result.webp"
            alt="ingame result of the example"
          />
        </Box>
      </Grid>
    </Box>
  );
};
