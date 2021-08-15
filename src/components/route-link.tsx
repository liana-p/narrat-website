/** @jsxImportSource theme-ui */

import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Link } from "theme-ui";

const RouteLink: React.FC<any> = (props) => {
  return <Link {...props} as={GatsbyLink} />;
};

export default RouteLink;
