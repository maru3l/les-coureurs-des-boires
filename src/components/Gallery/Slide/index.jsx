// vendor
import React from 'react';

// vendor components
import Img from 'gatsby-image';

// vendor utils
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Slide = React.forwardRef(({
  title, image, active, width, height,
}, ref) => {
  const className = classNames('gallery__image', {
    'gallery__image--is-active': active,
  });

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className="gallery__list-item" style={style}>
      {/* <img
        src={image.src}
        alt={title}
        className={className}
        width={width}
        height={height}
        ref={ref}
      /> */}
      <Img
        sizes={image}
        alt={title}
        className={className}
        ref={ref}
        style={style}
      />
    </div>
  );
});

Slide.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({}).isRequired,
  active: PropTypes.boolean,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

Slide.defaultProps = {
  title: '',
  active: false,
};

export default Slide;
