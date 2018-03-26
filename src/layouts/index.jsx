import React from 'react';
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';

import 'normalize.css';

import './../assets/fonts/bebasNeue/bebasNeue.css';

import './../assets/styles/styles.scss';

WebFont.load({
  google: {
    families: ['Cousine'],
  },
  // custom: {
  //   families: ['Bebas Neue'],
  //   urls: ['./../assets/fonts/bebasNeue/bebasNeue.css'],
  // }
});

const TemplateWrapper = ({ children }) => (
  <div>
    { children() }
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

TemplateWrapper.defaultProps = {
  children: () => {},
};

export default TemplateWrapper;
