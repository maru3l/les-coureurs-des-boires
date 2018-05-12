// vendor
import React from 'react';

// vendor components
import Img from 'gatsby-image';

// vendor utils
import PropTypes from 'prop-types';

// style
import './style.scss';

const Book = ({ book }) => {
  let videoId = '';
  let videoSrc = '';
  const regexp = /([\d])\w+/;

  if (book.video) {
    [videoId] = book.video.match(regexp);
    videoSrc = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <li className="book">
      <div className="book__cover-container">
        <Img
          className="book__cover"
          sizes={book.cover.sizes}
          alt={book.cover.title}
        />
        <p>
          <a
            href={book.buyingLink}
            target="_blank"
            className="book__link"
            rel="noopener noreferrer"
          >
            Acheter
          </a>
        </p>
      </div>

      <div className="book__content-container">
        <div className="book__title-container">
          <h2 className="book__title">
            <span className="book__title-text">{book.title}</span>
          </h2>
        </div>

        <div className="book__body">
          <div
            dangerouslySetInnerHTML={{
              __html: book.body.childMarkdownRemark.html,
            }}
          />
          {videoId.length > 0 && (
            <iframe
              title="Vidéo de présentation du livre «Les saveurs gastronomiques de la bière»."
              src={videoSrc}
              frameBorder="0"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.shape({
      sizes: PropTypes.object,
      title: PropTypes.string,
    }),
    title: PropTypes.string,
    body: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({ html: PropTypes.string }),
    }),
    video: PropTypes.string,
  }).isRequired,
};

export default Book;
