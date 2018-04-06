import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import './style.scss';

const ReadMoreLink = ({ to }) => (
  <Link to={to} className="read-more-link">
    <span className="read-more-link__dot" />
    <span className="read-more-link__dot" />
    <span className="read-more-link__dot" />
  </Link>
);

ReadMoreLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default ReadMoreLink;
