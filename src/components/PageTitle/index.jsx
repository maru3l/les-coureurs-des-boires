// vendor
import React from 'react';

// utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

// style
import './style.scss';

const PageTitle = ({ title, subTitle, backgroundIsBlue }) => (
  <div
    className={classNames('page-title', {
      'page-title--is-blue': backgroundIsBlue,
    })}
  >

    {backgroundIsBlue && (<div className="page-title__fake-header" />)}
    
    <div className="page-title__content">
      <p className="page-title__title">{title}</p>

      <p className="page-title__sub-title">{subTitle}</p>
    </div>
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  backgroundIsBlue: PropTypes.bool,
};

PageTitle.defaultProps = {
  subTitle: null,
  backgroundIsBlue: false,
};

export default PageTitle;
