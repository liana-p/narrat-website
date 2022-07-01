/** @jsxImportSource theme-ui */
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Box, Grid, Heading, Paragraph } from "theme-ui";

export interface FeatureHeroProps {
  title: string;
  subtitle: string;
  explanation: string;
}
export const FeatureHero: React.FC<FeatureHeroProps> = ({
  title,
  subtitle,
  explanation,
}) => {
  return (
    <Box sx={{ my: "l" }}>
      <Heading
        as="h1"
        variant="headings.feature"
        sx={{ textAlign: "center", mb: "s" }}
      >
        {title}
      </Heading>
      <Heading as="h3" sx={{ textAlign: "center", fontSize: "l" }}>
        {subtitle}
      </Heading>
      <Heading
        as="h3"
        sx={{ textAlign: "center", color: "accent", fontSize: "l" }}
      >
        {explanation}
      </Heading>
    </Box>
  );
};
