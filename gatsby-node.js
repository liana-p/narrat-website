const path = require(`path`);

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
};
