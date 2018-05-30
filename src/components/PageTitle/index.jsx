import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const PageTitle = ({ title, subTitle }) => (
  <div className="page-title">
    <div className="page-title__content">
      <p className="page-title__title">{title}</p>

      <p className="page-title__sub-title">{subTitle}</p>
    </div>
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};

PageTitle.defaultProps = {
  subTitle: null,
};

export default PageTitle;
