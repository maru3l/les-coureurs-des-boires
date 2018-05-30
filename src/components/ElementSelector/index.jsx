// vendor
import React, { Component } from 'react';

// utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

// styles
import './style.scss';

const Element = ({ children, elementClicked, selected }) => (
  <button
    onClick={e => elementClicked(e)}
    className={classNames(
      'element-selector__button',
      { 'element-selector__button--is-selected': selected },
    )}
  >
    {children}
  </button>
);

class ElementSelector extends Component {
  handleClick(e) {
    this.props.elementClicked(e);
  }

  isSelectedElement(el) {
    const { elementSelected } = this.props;
    return el === elementSelected;
  }


  render() {
    const { elements, title } = this.props;

    return (
      <div className="element-selector">
        <p className="element-selector__title">{title}</p>

        <ul className="element-selector__list">
          {elements.map(element => (
            <li className="element-selector__list-item" key={element.key}>
              <Element
                elementClicked={() => this.handleClick(element.key)}
                selected={this.isSelectedElement(element.key)}
              >
                {element.value}
              </Element>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Element.propTypes = {
  children: PropTypes.string.isRequired,
  elementClicked: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Element.defaultProps = {
  selected: false,
};

ElementSelector.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  elementClicked: PropTypes.func.isRequired,
  elementSelected: PropTypes.string,
  title: PropTypes.string,
};

ElementSelector.defaultProps = {
  title: null,
  elementSelected: null,
};

export default ElementSelector;
