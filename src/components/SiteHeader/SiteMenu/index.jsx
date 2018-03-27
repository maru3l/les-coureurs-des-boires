import React, { Component } from 'react';
import classNames from 'classnames';

import Navigation from './MenuNavigation';

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
        <div className="site-menu__content">

          <Navigation />

        </div>
      </div>
    );
  }
}

export default SiteMenu;
