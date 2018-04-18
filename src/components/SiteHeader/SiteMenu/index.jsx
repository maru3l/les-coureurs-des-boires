// vendor
import React from 'react';

// utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

// components
import Navigation from './MenuNavigation';
import Social from './MenuSocial';

// style
import './style.scss';

const SiteMenu = (props) => {
  const siteMenuClass = classNames('site-menu', {
    'site-menu--is-open': props.open,
  });

  return (
    <div className={siteMenuClass}>
      <Navigation onLinkClick={() => props.onLinkClick()} />

      <Social />
    </div>
  );
};

SiteMenu.propTypes = {
  open: PropTypes.bool,
  onLinkClick: PropTypes.func,
};

SiteMenu.defaultProps = {
  open: false,
  onLinkClick: () => {},
};

export default SiteMenu;
