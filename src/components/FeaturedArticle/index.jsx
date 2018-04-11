import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import propTypes from 'prop-types';

import ReadMoreLink from '../ui/ReadMoreLink';

import './style.scss';

const FeaturedArticle = ({ article }) => (
  <div className="featured-article">
    <div className="featured-article__content-container">
      <p className="featured-article__title"><Link to={article.path}>{article.title}</Link></p>
      <p className="featured-article__excerpt">{article.excerpt}</p>
      <ReadMoreLink to={article.path} />
    </div>
    <div className="featured-article__image-container">
      <Img className="featured-article__image" sizes={article.thumbnail.sizes} />
    </div>
  </div>
);

FeaturedArticle.propTypes = {
  article: propTypes.shape({
    path: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    excerpt: propTypes.string.isRequired,
    thumbnail: propTypes.shape({
      sizes: propTypes.object.isRequired,
    }),
  }).isRequired,
};

export default FeaturedArticle;
