import { useStaticQuery, graphql } from "gatsby";
import { PostsQuery } from "../../graphql-types";

export const usePosts = () => {
  const { posts } = useStaticQuery(
    graphql`
      query Posts {
        posts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/posts/" } }
        ) {
          nodes {
            excerpt
            body
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
  ) as PostsQuery;
  return posts;
};
