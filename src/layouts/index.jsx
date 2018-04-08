import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'normalize.css';

import Header from '../components/SiteHeader';
import Footer from '../components/SiteFooter';

import './../assets/fonts/bebasNeue/bebasNeue.css';

import './../assets/styles/styles.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <html lang="fr" />
    </Helmet>
    <Header />

    <main>
      { children() }
    </main>

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
