import React from 'react';
import propTypes from 'prop-types';

import './style.scss';

const Button = ({ onClick, children }) => (
  <button className="button" onClick={() => onClick()}>{ children }</button>
);

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.string.isRequired,
};

export default Button;
