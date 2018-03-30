import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MenuButton from '../MenuButton';

import './style.scss';

const MenuHandle = (props) => {
  const menuHandleClass = classNames(
    'menu-handle',
    { 'menu-handle--is-open': props.open },
  );

  return (
    <div className={menuHandleClass}>
      <MenuButton
        open={props.open}
        onClick={() => props.onClick()}
      />

      <div className="menu-handle__follow">
        <p>Suivez les coureurs</p>
      </div>

      <div className="menu-handle__search">
        <p>S</p>
      </div>
    </div>
  );
};

MenuHandle.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
};

MenuHandle.defaultProps = {
  onClick: () => {},
  open: false,
};

export default MenuHandle;
