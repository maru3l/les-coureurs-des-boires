import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import './style.scss';

const ListItemLink = ({ to, children }) => (
  <li className="site-navigation__list-item">
    <Link
      to={to}
      className="site-navigation__link"
      activeClassName="site-navigation__link--is-active"
    >
      {children}
    </Link>
  </li>
);

export default () => (
  <nav className="site-navigation">
    <ul className="site-navigation__list">
      {/* <ListItemLink to="voyages">Voyages</ListItemLink> */}
      {/* <ListItemLink to="editoriaux">Éditoriaux</ListItemLink> */}
      {/* <ListItemLink to="degustations">Dégustations</ListItemLink> */}
      <ListItemLink to="livres">Livres</ListItemLink>
      {/* <ListItemLink to="conferences">Conférences</ListItemLink> */}
      {/* <ListItemLink to="les-coureurs">Les coureurs</ListItemLink> */}
    </ul>
  </nav>
);

ListItemLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
