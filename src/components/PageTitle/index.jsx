import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const PageTitle = ({ title }) => (
  <div className="page-title">
    <div className="page-title__content">
      <p className="page-title__title">{title}</p>
    </div>
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
