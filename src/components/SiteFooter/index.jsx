import React from 'react';

import './style.scss';

const getYears = () => new Date().getFullYear();

export default () => (
  <footer className="site-footer">
    <p>© {getYears()} - Les coureurs des boires</p>
  </footer>
);
