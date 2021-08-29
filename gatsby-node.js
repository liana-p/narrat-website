const path = require(`path`);

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`./src/templates/page.tsx`)
  const pagesResult = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/pages/" } }
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
  )

  if (pagesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading pages`,
      pagesResult.errors
    )
    return
  }

  const pages = pagesResult.data.allMdx.nodes

  if (pages.length > 0) {
    pages.forEach((post, index) => {
      console.log("creating page ", post.fields.slug)
      createPage({
        path: post.fields.slug,
        component: pageTemplate,
        context: {
          id: post.id,
        },
      })
    })
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    // Handle old blog files
    const filePath = createFilePath({ node, getNode })
    const slug = node.frontmatter.slug || filePath
    createNodeField({ node, name: `slug`, value: slug })
  }
};
