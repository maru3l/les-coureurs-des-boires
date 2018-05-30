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
              suggestedArticles {
                id
              }
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

        const {
          data: {
            allContentfulArticle: { edges: articles },
          },
        } = result;

        // Generate Article page
        articles.forEach(({ node }) => {
          const { tags } = node;

          let relatedArticles = articles
            .map(({ node: article }) => {
              const articleTag = article.tags.filter(tag => tag !== 'coureurs des boires');
              const communTags = articleTag.filter(tag =>
                tags.find(element => element === tag));

              const score = communTags.length / articleTag.length;

              return {
                id: article.id,
                score,
              };
            })
            .filter(related => related.id !== node.id)
            .sort((a, b) => b.score - a.score);

          if (node.suggestedArticles) {
            relatedArticles = [...node.suggestedArticles, ...relatedArticles];
          }

          const relatedList = relatedArticles.map(related => related.id);

          createPage({
            path: node.fields.path,
            component: path.resolve('./src/templates/article/index.jsx'),
            context: {
              id: node.id,
              firstRelatedArticles: relatedList[0],
              secondRelatedArticles: relatedList[1],
              thirdRelatedArticles: relatedList[2],
            },
          });
        });

        // Create Page for each Countries
        // get countries slug
        // TODO: optimize the request. Use the allContentfulCountry insted
        const countrySlugs = articles.reduce((acc, { node: { country } }) => {
          if (country === null) return acc;
          if (acc.find(slug => slug === country.slug)) return acc;

          return [...acc, country.slug];
        }, []);

        countrySlugs.forEach((slug) => {
          createPage({
            path: `/voyages/${slug}`,
            component: path.resolve('./src/pages/voyages/index.jsx'),
          });
        });

        // TODO: Create tags page
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
