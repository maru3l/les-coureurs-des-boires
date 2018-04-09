import React from 'react';

import PageTitle from '../../components/PageTitle';
import BookList from '../../components/BookList';

const PageLivre = ({ data }) => {
  const { books, site } = data;
  console.log(data);
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
        }
      }
    }
  }
`;

export default PageLivre;
