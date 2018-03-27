import React from 'react';
import PropTypes from 'prop-types';

import 'normalize.css';

import Header from '../components/SiteHeader';
import Footer from '../components/SiteFooter';

import './../assets/fonts/bebasNeue/bebasNeue.css';

import './../assets/styles/styles.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Header />

    { children() }

    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

TemplateWrapper.defaultProps = {
  children: () => {},
};

export default TemplateWrapper;
