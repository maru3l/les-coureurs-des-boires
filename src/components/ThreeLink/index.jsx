// vendor
import React from 'react';

// vendor components
import Link from 'gatsby-link';

// style
import './style.scss';

const ThreeLink = () => (
  <div className="three-link">
    <Link to="/voyages" className="three-link__link">
      <span className="three-link__link-line">Voyages</span>
    </Link>

    <Link to="/editoriaux" className="three-link__link">
      <span className="three-link__link-line">Éditoriaux</span>
    </Link>

    <Link to="/degustations" className="three-link__link">
      <span className="three-link__link-line">Dégustations</span>
    </Link>
  </div>
);

export default ThreeLink;
