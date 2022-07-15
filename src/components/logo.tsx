/** @jsxImportSource theme-ui */
import { StaticImage } from "gatsby-plugin-image";

const Logo: React.FC<any> = () => (
  <StaticImage
    alt="Narrat logo"
    src="./top-nav/logo.svg"
    sx={{ variant: "images.logo" }}
  />
);

export default Logo;
