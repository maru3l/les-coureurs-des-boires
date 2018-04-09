import React from 'react';
import PropTypes from 'prop-types';

import PageTitle from '../../components/PageTitle';
import BookList from '../../components/BookList';

const PageLivre = ({ data }) => {
  const { books } = data;
  return (
    <React.Fragment>
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
    books:allContentfulLivre(sort: {order: DESC, fields: [publicationDate]}) {
      edges {
        node {
          id
          title
          cover {
            sizes(maxWidth: 304) {
              ...GatsbyContentfulSizes_withWebp
            }
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
