/** @jsxImportSource theme-ui */

import * as React from "react";
import { Button, Link } from "theme-ui";

export interface ButtonLinkProps {
  title: string;
  link: string;
}
const ButtonLink: React.FC<ButtonLinkProps> = ({ title, link, ...props }) => {
  return (
    <Link href={link} sx={{ variant: "links.button" }} {...props}>
      <Button {...props} sx={{ variant: "buttons.link" }}>
        {title}
      </Button>
    </Link>
  );
};

export default ButtonLink;
