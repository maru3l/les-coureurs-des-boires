// vendor
import React from 'react';

// utils
import classNames from 'classnames';

const Slide = React.forwardRef(({
  title, image, active, width, height,
}, ref) => {
  const className = classNames('gallery__image', {
    'gallery__image--is-active': active,
  });

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url(${image.base64})`,
  };

  return (
    <div className="gallery__list-item" style={style}>
      <img
        src={image.src}
        alt={title}
        className={className}
        width={width}
        height={height}
        ref={ref}
      />
    </div>
  );
});

export default Slide;
