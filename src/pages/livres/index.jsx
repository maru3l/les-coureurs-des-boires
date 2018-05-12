// vendor
import React from 'react';

// vendor components
import Helmet from 'react-helmet';

// utils
import PropTypes from 'prop-types';

// components
import PageTitle from '../../components/PageTitle';
import BookList from '../../components/BookList';

const PageLivre = ({ data }) => {
  const {
    books,
    site: {
      siteMetadata: { siteUrl, title: siteTitle },
    },
  } = data;

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Livres | ${siteTitle}`}</title>
        <meta
          name="description"
          content="Présentation des nombreux ouvrages publiés par le duo Les Coureurs des Boires, récipiendaires de nombreux prix nationaux et internationaux"
        />

        <meta name="twitter:card" value="summary" />

        <meta property="og:title" content="Livres | Les coureurs des boires" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/livres`} />
        {/* <meta property="og:image" content={this.article.hero.ogMeta.src} /> */}
        <meta
          property="og:description"
          content="Présentation des nombreux ouvrages publiés par le duo Les Coureurs des Boires, récipiendaires de nombreux prix nationaux et internationaux"
        />
        <meta property="og:site_name" content="Les coureurs des boires" />

        <link rel="canonical" href={`${siteUrl}/livres`} />
      </Helmet>
      <PageTitle title="livres" />
      <BookList books={books.edges} />
    </React.Fragment>
  );
};

export const query = graphql`
  query BooksPageQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    books: allContentfulLivre(
      sort: { order: DESC, fields: [publicationDate] }
    ) {
      edges {
        node {
          id
          title
          cover {
            sizes(maxWidth: 304) {
              ...GatsbyContentfulSizes_withWebp
            }
            title
          }
          body {
            childMarkdownRemark {
              html
            }
          }
          video
          buyingLink
        }
      }
    }
  }
`;

PageLivre.propTypes = {
  data: PropTypes.shape({
    books: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default PageLivre;
