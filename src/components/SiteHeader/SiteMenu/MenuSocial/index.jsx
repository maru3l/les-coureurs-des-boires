// vendor
import React from 'react';

// style
import './style.scss';

export default () => (
  <ul className="menu-social">
    {/* <li className="menu-social__list-item">
      <button className="menu-social__link">Courriel</button>
    </li> */}
    <li className="menu-social__list-item">
      <a
        href="https://www.facebook.com/lescoureursdesboires/"
        className="menu-social__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
    </li>
    <li className="menu-social__list-item">
      <a
        href="https://www.instagram.com/lescoureursdesboires/"
        className="menu-social__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </li>
  </ul>
);
