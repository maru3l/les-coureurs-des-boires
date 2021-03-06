import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const MenuButton = ({ open, onClick }) => {
  const menuButtonClass = classNames(
    'menu-button',
    { 'menu-button--is-open': open },
  );

  return (
    <button className={menuButtonClass} onClick={() => onClick()}>
      <span className="menu-button__bread menu-button__bread--first">
        <span className="menu-button__crust" />
      </span>

      <span className="menu-button__bread  menu-button__bread--second">
        <span className="menu-button__crust" />
      </span>

      <span className="menu-button__bread  menu-button__bread--third">
        <span className="menu-button__crust" />
      </span>
    </button>
  );
};

MenuButton.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};

MenuButton.defaultProps = {
  open: false,
  onClick: () => {},
};

export default MenuButton;
