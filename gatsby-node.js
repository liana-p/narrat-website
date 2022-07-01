const path = require(`path`);

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async (context) => {
  await createPosts(context);
  await loadPages(context);
};

async function loadPages({ graphql, actions, reporter }) {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`./src/templates/page.tsx`);
  const pagesResult = await graphql(
    `
      {
        allMdx(filter: { fileAbsolutePath: { regex: "/pages/" } }) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (pagesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading pages`,
      pagesResult.errors
    );
    return;
  }

  const pages = pagesResult.data.allMdx.nodes;

  if (pages.length > 0) {
    pages.forEach((post, index) => {
      console.log("creating page ", post.fields.slug);
      createPage({
        path: post.fields.slug,
        component: pageTemplate,
        context: {
          id: post.id,
        },
      });
    });
  }
}

async function createPosts({ graphql, actions, reporter }) {
  const blogPost = path.resolve(`./src/templates/post.tsx`);
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMdx.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `news/${post.fields.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    // Handle old blog files
    const filePath = createFilePath({ node, getNode });
    const slug = node.frontmatter.slug || filePath;
    createNodeField({ node, name: `slug`, value: slug });
  }
};
