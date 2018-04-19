// vendor
import React from 'react';

// vendor components
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

// style
import './style.scss';

const ListItemLink = ({ to, children, onClick }) => (
  <li className="site-navigation__list-item">
    <Link
      to={to}
      className="site-navigation__link"
      activeClassName="site-navigation__link--is-active"
      onClick={() => onClick()}
    >
      {children}
    </Link>
  </li>
);

const MenuNavigation = ({ onLinkClick }) => (
  <nav className="site-navigation">
    <ul className="site-navigation__list">
      <ListItemLink to="voyages" onClick={() => onLinkClick()}>
        Voyages
      </ListItemLink>

      <ListItemLink to="editoriaux" onClick={() => onLinkClick()}>
        Éditoriaux
      </ListItemLink>

      <ListItemLink to="degustations" onClick={() => onLinkClick()}>
        Dégustations
      </ListItemLink>

      <ListItemLink to="livres" onClick={() => onLinkClick()}>
        Livres
      </ListItemLink>

      {/* <ListItemLink to="conferences" onClick={() => onLinkClick()}>
        Conférences
      </ListItemLink> */}

      {/* <ListItemLink to="les-coureurs" onClick={() => onLinkClick()}>
        Les coureurs
      </ListItemLink> */}
    </ul>
  </nav>
);

ListItemLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ListItemLink.defaultProps = {
  onClick: () => {},
};

MenuNavigation.propTypes = {
  onLinkClick: PropTypes.func,
};

MenuNavigation.defaultProps = {
  onLinkClick: () => {},
};

export default MenuNavigation;
