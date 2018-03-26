import React from 'react';
import PropTypes from 'prop-types';

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
