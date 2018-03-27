import React from 'react';

import MenuButton from '../MenuButton';

import './style.scss';

const MenuHandle = (props) => {

  return (
    <div className="menu-handle">
      <MenuButton
        open={props.open}
        onClick={() => props.onClick()}
      />

      <div className="menu-handle__follow">
        <p onClick={() => props.onClick()}>Suivez les coureurs</p>
      </div>

      <div className="menu-handle__search">
        <p>S</p>
      </div>
    </div>
  );
};

export default MenuHandle;
