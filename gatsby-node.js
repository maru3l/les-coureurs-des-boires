const path = require('path');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'ContentfulArticle') {
    let slugPath = '';
    let country = '';

    switch (node.category) {
      case 'Éditorial':
        slugPath = '/editoriaux/';
        break;
      case 'Voyage':
        country = getNode(node.country___NODE).slug;
        slugPath = `/voyages/${country}/`;
        break;
      case 'Dégustation':
        slugPath = '/degustations/';
        break;
      default:
        slugPath = '/';
    }

    createNodeField({
      node,
      name: 'path',
      value: `${slugPath}${node.slug}/`,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulArticle {
          edges {
            node {
              id
              tags
              fields {
                path
              }
            }
          }
        }
      }
    `)
      .then((result) => {
        // Generate Article page
        result.data.allContentfulArticle.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.path,
            component: path.resolve('./src/templates/article/index.jsx'),
            context: {
              id: node.id,
            },
          });
        });

        // Generate tags page
        // const tags = result.data.allContentfulArticle.edges
        //   .reduce((acc, { node }) => [...acc, ...node.tags], [])
        //   .filter((el, i, self) => i === self.indexOf(el));
        //
        // tags.forEach((tag) => {
        //   createPage({
        //     path: `/tags/${tag}`,
        //     component: path.resolve('./src/templates/tagPage.jsx'),
        //     context: { tag },
        //   });
        // });

        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};
