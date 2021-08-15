/** @jsxImportSource theme-ui */
import { StaticImage } from "gatsby-plugin-image";

const Logo: React.FC<any> = (props) => (
  <StaticImage
    {...props}
    alt="Narrat logo"
    src="../images/icon.png"
    sx={{ variant: "images.logo" }}
  />
);

export default Logo;
