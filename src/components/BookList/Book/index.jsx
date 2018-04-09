import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

import './style.scss';

const Book = ({ book }) => (
  <li className="book">
    <div className="book__cover-container">
      <Img className="book__cover" sizes={book.cover.sizes} />
      <p>
        <a
          href={book.buyingLink}
          target="_blank"
          className="book__link"
          rel="noopener noreferrer"
        >
          Acheter
        </a>
      </p>
    </div>

    <div className="book__content-container">
      <div className="book__title-container">
        <h2 className="book__title">{book.title}</h2>
      </div>

      <div className="book__body" dangerouslySetInnerHTML={{ __html: book.body.childMarkdownRemark.html }} />
    </div>
  </li>
);

Book.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.shape({
      sizes: PropTypes.object,
    }),
    title: PropTypes.string,
    body: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({ html: PropTypes.string }),
    }),
    video: PropTypes.string,
  }).isRequired,
};

export default Book;
