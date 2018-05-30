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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=A0ePJoooGx"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=A0ePJoooGx"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=A0ePJoooGx"
      />
      <link rel="manifest" href="/site.webmanifest?v=A0ePJoooGx" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg?v=A0ePJoooGx"
        color="#002537"
      />
      <link rel="shortcut icon" href="/favicon.ico?v=A0ePJoooGx" />
      <meta
        name="apple-mobile-web-app-title"
        content="Les coureurs des boires"
      />
      <meta name="application-name" content="Les coureurs des boires" />
      <meta name="msapplication-TileColor" content="#0b2536" />
      <meta name="theme-color" content="#fff9ec" />
    </Helmet>
    <Header />

    <main>{children()}</main>

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
