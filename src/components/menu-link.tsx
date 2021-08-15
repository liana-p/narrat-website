/** @jsxImportSource theme-ui */
import * as React from "react";
import { Box } from "theme-ui";
import RouteLink from "./route-link";

export const MenuLink: React.FC<{ path: string; title: string }> = ({
  path,
  title,
}) => {
  return (
    <Box
      sx={{
        px: "m",
        py: "s",
        mr: "m",
        borderRadius: "5px",
        bg: "Background",
      }}
    >
      <RouteLink sx={{ variant: "links.nav" }} to={path}>
        {title}
      </RouteLink>
    </Box>
  );
};

export default MenuLink;
