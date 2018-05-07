// vendor
import React, { Component } from 'react';

// Components
import Slide from './Slide';

// utils
import { randomString } from '../../utils';

// styles
import './styles.scss';

const createSlidesArray = (images = []) => {
  let imageList = [...images];

  while (imageList.length < 7) {
    const newImage = imageList.map(img => ({
      ...img,
      id: `${img.id}-clone${randomString()}`,
      active: false,
      previous: false,
    }));
    imageList = [...imageList, ...newImage];
  }

  return imageList;
};

const equilibrate = (array, index) => {
  const middle = Math.ceil((array.length - 1) / 2);
  let result = array;

  if (index < middle) {
    const toMove = index - middle;
    result = [...array.slice(toMove), ...array.slice(0, toMove)];
  }

  if (middle < index) {
    const toMove = index - middle;
    result = [...array.slice(toMove), ...array.slice(0, toMove)];
  }

  return result;
};

const getPosition = (array, id) => {
  const index = array.findIndex(({ key }) => key === id);

  return array
    .slice(0, index + 1)
    .reduce((acc, cur) => acc + cur.props.width, 0);
};

const setActiveID = (slides, id) => {
  return slides.map(slide => ({ ...slide, active: slide.id === id }));
};

const setPreviousID = (slides, id) => {
  return slides.map(slide => ({ ...slide, previous: slide.id === id }));
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    const { images } = props;

    this.listWrapperRef = React.createRef();

    const slides = createSlidesArray(images);

    this.state = {
      slides,
      throttle: false,
    };
  }

  componentDidMount() {
    const { slides } = this.state;
    const { id } = slides[0];
    let newSlides = slides;
    newSlides = setActiveID(newSlides, id);
    newSlides = setPreviousID(newSlides, id);
    this.setState({ slides: newSlides });
  }

  getActiveId() {
    const slide = this.state.slides.find(({ active }) => active);

    return slide ? slide.id : 0;
  }

  getArrayIndex(idToFind) {
    return this.state.slides.findIndex(({ id }) => id === idToFind);
  }

  getPreviousID() {
    const slide = this.state.slides.find(({ previous }) => previous);

    return slide ? slide.id : 0;
  }

  handleClickToPrevious() {
    if (this.state.throttle) return;

    const prevID = this.getActiveId();
    const index = this.getArrayIndex(prevID);
    let { slides } = this.state;
    const { length } = slides;
    let newIndex = index - 1;

    if (newIndex < 0) {
      newIndex = length - 1;
    }

    const { id } = this.state.slides[newIndex];

    slides = setActiveID(slides, id);
    slides = setPreviousID(slides, prevID);

    this.setState({ slides });
  }

  handleClickToNext() {
    if (this.state.throttle) return;

    const prevID = this.getActiveId();
    const index = this.getArrayIndex(prevID);
    let { slides } = this.state;
    const { length } = slides;
    let newIndex = index + 1;

    if (length <= newIndex) {
      newIndex = 0;
    }

    const { id } = this.state.slides[newIndex];

    slides = setActiveID(slides, id);
    slides = setPreviousID(slides, prevID);

    this.setState({ slides });
  }

  generateSlidesComponentsArray() {
    const { slides: images } = this.state;
    const activeID = this.getActiveId();
    let slides = [];
    let height = 0;

    if (this.listWrapperRef.current) {
      height = this.listWrapperRef.current.offsetHeight;
    }

    slides = images.map(({ id, title, image }) => {
      const ref = React.createRef();
      const active = activeID === id;
      return (
        <Slide
          title={title}
          image={image}
          key={id}
          ref={ref}
          height={height}
          width={height * image.aspectRatio}
          active={active}
        />
      );
    });

    return slides;
  }

  render() {
    // const { throttle } = this.state;
    const activeID = this.getActiveId();
    // const previousID = this.getPreviousID();
    let slidesComponents = this.generateSlidesComponentsArray();
    slidesComponents = equilibrate(
      slidesComponents,
      this.getArrayIndex(activeID),
    );
    const position = getPosition(slidesComponents, activeID);
    let width = 0;

    if (this.listWrapperRef.current) {
      width = this.listWrapperRef.current.offsetWidth;
    }

    const style = {
      transform: `translateX(-${position - width}px)`,
      // transition: throttle ? 'transform 400ms' : 'none',
    };

    return (
      <div className="gallery">
        <p className="gallery__title">Gallerie instagram</p>

        <div className="gallery__container">
          <div className="gallery__list-wrapper" ref={this.listWrapperRef}>
            <div className="gallery__list" style={style}>
              {slidesComponents}
            </div>
          </div>

          <div className="gallery__controller">
            <button
              className="gallery__control"
              onClick={() => this.handleClickToPrevious()}
            >
              prev
            </button>
            <button
              className="gallery__control"
              onClick={() => this.handleClickToNext()}
            >
              next
            </button>
          </div>

          <div className="gallery__count" />

          <div className="gallery__caption">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              cum doloremque deserunt assumenda, sit reiciendis voluptates,
              provident id eveniet commodi eligendi labore neque necessitatibus
              porro explicabo minus sed, iste dicta.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
