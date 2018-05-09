// vendor
import React from 'react';

// vendor utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const createContentSection = (children) => {
  let result;

  switch (children.type) {
    case 'ul':
      result = (
        <ul className={classNames('col__content', children.props.className)}>
          {children.props.children}
        </ul>
      );
      break;

    default:
      result = <div className="col__content">{children}</div>;
  }

  return result;
};

const Col = ({ children, title }) => (
  <div className="col">
    <p className="col__title">{title}</p>
    {createContentSection(children)}
  </div>
);

Col.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Col;
