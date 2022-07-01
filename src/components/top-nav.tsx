/** @jsxImportSource theme-ui */

import * as React from "react";
import { Box, Button, Container, Flex, Heading, NavLink } from "theme-ui";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import Logo from "./logo";
import MenuLink from "./menu-link";
import RouteLink from "./route-link";
import RouteNavLink from "./route-nav-link";
import { FaDiscord, FaGithub } from "react-icons/fa";

export interface TopNavProps {
  location: Location;
  title: string;
}
const TopNav: React.FC<TopNavProps> = ({ location, title }) => {
  const metadata = useSiteMetadata();
  return (
    <Box
      as="nav"
      sx={{
        py: "s",
        px: "l",
      }}
    >
      <Flex sx={{ justifyContent: "space-between" }}>
        <Flex sx={{ alignItems: "center" }}>
          <div>
            <RouteNavLink
              to="/"
              sx={{
                variant: "links.nav",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Logo sx={{ width: 40 }} />
              <h1 sx={{ m: 0, ml: "m", p: 0 }}>Narrat</h1>
            </RouteNavLink>
          </div>
          <NavLink
            href="https://docs.get-narrat.com"
            sx={{ variant: "links.nav", ml: "xl" }}
            target="_blank"
            rel="noopener"
          >
            Docs
          </NavLink>
          <RouteNavLink to="/narrat-faq" title="FAQ">
            FAQ
          </RouteNavLink>
          <RouteNavLink to="/news" title="News">
            News
          </RouteNavLink>
        </Flex>
        <Box sx={{ display: "flex", placeItems: "center" }}>
          <NavLink
            href="https://discord.gg/Xgz7EQ2Xgh"
            sx={{ variant: "links.nav" }}
            target="_blank"
            rel="noopener"
          >
            <FaDiscord sx={{ mr: "s" }}></FaDiscord>Join the Discord
          </NavLink>
          <NavLink
            href="https://github.com/nialna/narrat"
            sx={{ variant: "links.nav" }}
            target="_blank"
            rel="noopener"
          >
            <FaGithub sx={{ mr: "s" }}></FaGithub>GitHub
          </NavLink>
        </Box>
      </Flex>
    </Box>
  );
};

export default TopNav;
