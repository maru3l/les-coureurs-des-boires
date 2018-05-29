// vendor
import React from 'react';

// utils
import PropTypes from 'prop-types';

// style
import './style.scss';

const PageIntro = ({ children, title }) => (
  <div className="page-intro">
    <h1 className="page-intro__title">{title}</h1>

    <p className="page-intro__text">{children}</p>
  </div>
);

PageIntro.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default PageIntro;
