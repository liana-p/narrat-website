import { useStaticQuery, graphql } from "gatsby";
import { NewsListQuery } from "../../graphql-types";

export const useNewsList = () => {
  const { news } = useStaticQuery(
    graphql`
      query NewsList {
        news: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/posts/" } }
        ) {
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    `
  ) as NewsListQuery;
  return news;
};
