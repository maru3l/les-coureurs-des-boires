import React from 'react';
import PropTypes from 'prop-types';

import 'normalize.css';

import './../assets/fonts/bebasNeue/bebasNeue.css';

import './../assets/styles/styles.scss';

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
