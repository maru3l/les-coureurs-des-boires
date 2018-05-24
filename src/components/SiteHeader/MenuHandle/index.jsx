// vendor
import React from 'react';

// vendor utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

// components
import MenuButton from '../MenuButton';

// style
import './style.scss';

const MenuHandle = (props) => {
  const menuHandleClass = classNames('menu-handle', {
    'menu-handle--is-open': props.open,
  });

  return (
    <div className={menuHandleClass}>
      <MenuButton open={props.open} onClick={() => props.onClick()} />

      <button className="menu-handle__follow" onClick={() => props.onClick()}>
        <p>Suivez les coureurs</p>
      </button>

      {/* <button className="menu-handle__search" onClick={() => props.onClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="33" viewBox="0 0 36 33">
          <g fill="none" fillRule="evenodd" stroke="#002537" transform="rotate(-45 16.45 6.964)">
            <circle cx="11.207" cy="11.379" r="10.5" />
            <path strokeLinecap="square" d="M10.7071068,24.8786797 L10.7071068,33.8786797" />
          </g>
        </svg>
      </button> */}
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
