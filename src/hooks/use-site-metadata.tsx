import { useStaticQuery, graphql } from "gatsby";
import { SiteMetaDataQuery } from "../../graphql-types";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            siteTitle
            siteUrl
            description
            siteImage
          }
        }
      }
    `
  ) as SiteMetaDataQuery;
  return site?.siteMetadata!;
};
