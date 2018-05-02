import React from 'react';
import PropTypes from 'prop-types';

import PageTitle from '../components/PageTitle';
import ArticleList from '../components/ArticleList';

const DégustationsPage = ({ data }) => {
  const articles = () => {
    if (data.articles) {
      return data.articles.edges.map(({ node }) => ({
        thumbnail: {
          sizes: node.hero.sizes,
          alt: node.hero.title,
        },
        date: node.publicationDate,
        title: node.title,
        excerpt: node.description.description,
        id: node.id,
        path: node.fields.path,
      }));
    }

    return [];
  };

  const style = {};

  style.title = {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
  };

  return (
    <React.Fragment>
      <h1 style={style.title}>Dégustations</h1>
      <PageTitle title="Dégustations" />
      <ArticleList articles={articles()} />
    </React.Fragment>
  );
};

export const query = graphql`
  query DegustationsQuery {
    articles: allContentfulArticle(
      sort: { order: DESC, fields: [publicationDate] }
      filter: { category: { eq: "Dégustation" } }
    ) {
      edges {
        node {
          id
          title
          publicationDate(formatString: "DD/MM/YYYY")
          hero {
            sizes(maxWidth: 304) {
              ...GatsbyContentfulSizes_withWebp
            }
            description
            title
          }
          description {
            description
          }
          fields {
            path
          }
        }
      }
    }
  }
`;

DégustationsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default DégustationsPage;
