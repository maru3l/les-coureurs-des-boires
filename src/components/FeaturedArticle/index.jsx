import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import ReadMoreLink from '../ui/ReadMoreLink';

import './style.scss';

const FeaturedArticle = ({ article }) => {
  console.log(article);
  return (
    <div className="featured-article">
      <div className="featured-article__content-container">
        <p className="featured-article__title"><Link to={article.path}>{article.title}</Link></p>
        <p className="featured-article__excerpt">{article.excerpt}</p>
        <ReadMoreLink to={article.path} />
        <img src="" alt="" />
      </div>
      <div className="featured-article__image-container">
        <Img className="book__cover" sizes={article.thumbnail.sizes} />
      </div>
    </div>
  );
};

export default FeaturedArticle;
