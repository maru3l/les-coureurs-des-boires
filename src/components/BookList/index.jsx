import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import Book from './Book';

const BookList = ({ books }) => (
  <ul className="book-list">
    {books.map(({ node }) => <Book book={node} key={node.id} />)}
  </ul>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookList;
