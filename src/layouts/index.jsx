import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'normalize.css';

import Header from '../components/SiteHeader';
import Footer from '../components/SiteFooter';

import './../assets/fonts/bebasNeue/bebasNeue.css';

import './../assets/styles/styles.scss';

const TemplateWrapper = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <html lang="fr" />
    </Helmet>
    <Header />

    <main>
      { children() }
    </main>

    <Footer />
  </React.Fragment>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

TemplateWrapper.defaultProps = {
  children: () => {},
};

export default TemplateWrapper;
