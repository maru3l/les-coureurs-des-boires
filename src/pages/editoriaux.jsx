// vendor
import React from 'react';

// vendor components
import Helmet from 'react-helmet';

// utils
import PropTypes from 'prop-types';

// components
import PageTitle from '../components/PageTitle';
import ArticleList from '../components/ArticleList';

const EditoriauxPage = ({ data }) => {
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

  const {
    site: {
      siteMetadata: { siteUrl, title: siteTitle },
    },
  } = data;

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Éditoriaux | ${siteTitle}`}</title>
        <meta
          name="description"
          content="Série d'articles dans lesquels Les Coureurs des Boires livrent leur vision parfois avant-gardiste de l'univers brassicole"
        />

        <meta name="twitter:card" value="summary" />

        <meta
          property="og:title"
          content="Éditoriaux | Les coureurs des boires"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/editoriaux`} />
        {/* <meta property="og:image" content={this.article.hero.ogMeta.src} /> */}
        <meta
          property="og:description"
          content="Série d'articles dans lesquels Les Coureurs des Boires livrent leur vision parfois avant-gardiste de l'univers brassicole"
        />
        <meta property="og:site_name" content="Les coureurs des boires" />

        <link rel="canonical" href={`${siteUrl}/editoriaux`} />
      </Helmet>
      <h1 style={style.title}>Éditoriaux</h1>
      <PageTitle title="Éditoriaux" />
      <ArticleList articles={articles()} />
    </React.Fragment>
  );
};

export const query = graphql`
  query EditoriauxQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    articles: allContentfulArticle(
      sort: { order: DESC, fields: [publicationDate] }
      filter: { category: { eq: "Éditorial" } }
    ) {
      edges {
        node {
          id
          title
          publicationDate(formatString: "DD/MM/YYYY")
          hero {
            sizes(maxWidth: 304, maxHeight: 200, quality: 100) {
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

EditoriauxPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default EditoriauxPage;
