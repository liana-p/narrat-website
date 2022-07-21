/** @jsxImportSource theme-ui */
import * as React from "react";
import { Badge, Box, Heading } from "theme-ui";
import { NewsListQuery } from "../../../graphql-types";
import RouteLink from "./../route-link";

type NewsList = NewsListQuery["news"]["nodes"];

export const NewsList: React.FC<{ news: NewsList }> = ({ news }) => {
  return (
    <Box>
      <Heading as="h1">News</Heading>
      {news &&
        news.length > 0 &&
        news.map((post) => {
          const title = post.frontmatter!.title || post.fields!.slug;
          const excerpt = post.excerpt;
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
              <Box>{post.excerpt}</Box>
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
