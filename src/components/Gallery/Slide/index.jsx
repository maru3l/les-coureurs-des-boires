import React from 'react';

const Slide = React.forwardRef(({ title, image }, ref) => (
  <img src={image.src} alt={title} className="gallery__image" ref={ref} />
));

export default Slide;
