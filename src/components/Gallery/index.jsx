// vendor
import React, { Component } from 'react';

// Components
import Slide from './Slide';

// utils
import { randomString } from '../../utils';

// styles
import './styles.scss';

const createSlidesArray = (images = []) => {
  let slides = [];
  let imageList = [...images];

  while (imageList.length < 7) {
    const newImage = imageList.map(img => ({
      ...img,
      id: `${img.id}-clone${randomString()}`,
    }));
    imageList = [...imageList, ...newImage];
  }

  slides = imageList.map(({ id, title, image }) => {
    const ref = React.createRef();
    return <Slide title={title} image={image} key={id} ref={ref} />;
  });

  return [...slides.slice(-3), ...slides.slice(0, -3)];
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    const { images } = props;

    this.listWrapperRef = React.createRef();
    this.slides = createSlidesArray(images);

    this.state = {
      currentSlide: this.slides[3].key,
      position: 0,
      throttle: false,
    };
  }

  componentDidMount() {
    const position = this.getPosition(this.state.currentSlide);
    this.setState({
      position,
    });
  }

  getArrayIndex(keyToFind) {
    return this.slides.findIndex(({ key }) => key === keyToFind);
  }

  getPosition(key) {
    const index = this.getArrayIndex(key);
    const {
      current: { offsetHeight, offsetWidth },
    } = this.listWrapperRef;
    const width = this.slides
      .slice(0, index + 1)
      .reduce(
        (acc, cur) => acc + cur.props.image.aspectRatio * offsetHeight,
        0,
      );

    return width - offsetWidth;
  }

  handleClickToPrevious() {
    if (this.state.throttle) return;

    const index = this.getArrayIndex(this.state.currentSlide);
    const { key } = this.slides[index - 1];

    this.move(this.state.currentSlide, key);
  }

  handleClickToNext() {
    if (this.state.throttle) return;

    const index = this.getArrayIndex(this.state.currentSlide);
    const { key } = this.slides[index + 1];

    this.move(this.state.currentSlide, key);
  }

  move(oldKey, key) {
    const oldIndex = this.getArrayIndex(oldKey);
    const index = this.getArrayIndex(key);
    this.setState({
      currentSlide: key,
      position: this.getPosition(key),
      throttle: true,
    });

    setTimeout(() => {
      if (oldIndex < index) {
        this.slides.push(this.slides.shift());
      } else {
        this.slides.unshift(this.slides.pop());
      }

      this.setState({
        position: this.getPosition(key),
        throttle: false,
      });
    }, 400);
  }

  render() {
    const { position, throttle } = this.state;

    const style = {
      transform: `translateX(-${position}px)`,
      transition: throttle ? 'transform 400ms' : 'none',
    };

    return (
      <div className="gallery">
        <p className="gallery__title">Gallerie instagram</p>

        <div className="gallery__container">
          <div className="gallery__list-wrapper" ref={this.listWrapperRef}>
            <div className="gallery__list" style={style}>
              {this.slides}
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
