import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Navigation from './MenuNavigation';
import Social from './MenuSocial';

import './style.scss';

class SiteMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const siteMenuClass = classNames(
      'site-menu',
      { 'site-menu--is-open': this.props.open },
    );
    return (
      <div className={siteMenuClass}>
        <Navigation />

        <Social />
      </div>
    );
  }
}

SiteMenu.propTypes = {
  open: PropTypes.bool,
};

SiteMenu.defaultProps = {
  open: false,
};

export default SiteMenu;
