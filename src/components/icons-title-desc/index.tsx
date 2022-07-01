/** @jsxImportSource theme-ui */
import * as React from "react";
import { Box, Heading, Link, Paragraph } from "theme-ui";

export interface IconsTitleDescProps {
  icon: JSX.Element;
  title: string;
  explanation: string;
  link: string;
  linkTitle: string;
}
export const IconTitleDesc: React.FC<IconsTitleDescProps> = ({
  icon,
  title,
  explanation,
  link,
  linkTitle,
}) => {
  const Elem = React.cloneElement(icon, {
    style: { width: "65px", height: "65px", my: "m" },
  }) as any;
  return (
    <Box sx={{ my: "l", variant: "boxes.flexVertical" }}>
      {Elem}
      <Heading as="h2" sx={{ textAlign: "center", my: "m" }}>
        {title}
      </Heading>
      <Paragraph sx={{ textAlign: "center", mb: "m" }}>{explanation}</Paragraph>
      <Link href={link} target="_blank" rel="noopener">
        {linkTitle}
      </Link>
    </Box>
  );
};
