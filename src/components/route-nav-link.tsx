/** @jsxImportSource theme-ui */

import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { NavLink } from "theme-ui";

const RouteNavLink: React.FC<any> = ({ children, ...props }) => {
  return (
    <NavLink {...props} as={GatsbyLink}>
      {children}
    </NavLink>
  );
};

export default RouteNavLink;
