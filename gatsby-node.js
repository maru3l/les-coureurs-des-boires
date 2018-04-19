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
              country {
                id
                slug
              }
            }
          }
        }
      }
    `)
      .then((result) => {
        // Get articles
        const { data: { allContentfulArticle: { edges: articles } } } = result;

        // get countries slug
        const countrySlugs = articles.reduce((acc, { node: { country } }) => {
          if (country === null) return acc;
          if (acc.find(slug => slug === country.slug)) return acc;

          return [...acc, country.slug];
        }, []);

        // Generate Article page
        articles.forEach(({ node }) => {
          createPage({
            path: node.fields.path,
            component: path.resolve('./src/templates/article/index.jsx'),
            context: {
              id: node.id,
            },
          });
        });

        countrySlugs.forEach((slug) => {
          createPage({
            path: `/voyages/${slug}`,
            component: path.resolve('./src/pages/voyages/index.jsx'),
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
