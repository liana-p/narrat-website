/** @jsxImportSource theme-ui */
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import { Badge, Box, Heading } from "theme-ui";
import { PostsQuery } from "../../graphql-types";
import { shortcodes } from "../helpers/componentShortcodes";
import RouteLink from "./route-link";

type NewsFull = PostsQuery["posts"]["nodes"];

export const NewsFull: React.FC<{ news: NewsFull }> = ({ news }) => {
  return (
    <Box>
      <Heading as="h1">News</Heading>
      {news &&
        news.length > 0 &&
        news.map((post) => {
          const title = post.frontmatter!.title || post.fields!.slug;
          return (
            <Box sx={{ my: "l", variant: "boxes.verticalSeparated" }}>
              <Heading
                sx={{
                  variant: "headings.articleHeading",
                  fontSize: "xxxl",
                }}
                as="h1"
              >
                <RouteLink
                  to={`/news/${post.fields!.slug}`}
                  sx={{ variant: "links.unstyled" }}
                >
                  {post.frontmatter!.title}
                </RouteLink>
              </Heading>
              <Heading
                sx={{
                  variant: "headings.dateHeading",
                }}
                as="h5"
              >
                Published on {post.frontmatter!.date}
              </Heading>
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
            </Box>
          );
        })}
      {!news && (
        <Box>
          <Heading>No News</Heading>
        </Box>
      )}
    </Box>
  );
};
