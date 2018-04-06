import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'gatsby-link';

import './style.scss';

const ArticleListItem = ({ article, index }) => {
  const itemClass = classNames(
    'article-list__item',
    `article-list__item--order-${index + 1}`,
  );

  return (
    <li className={itemClass}>
      <div className="article-list__item-contener">
        <img
          className="article-list__item-thumbnail"
          src={article.thumbnail.src}
          alt={article.thumbnail.alt}
        />
        <p className="article-list__item-date">Publié {article.date}</p>
        <h3 className="article-list__item-title">{article.title}</h3>
        <p className="article-list__item-text">{article.excerpt}</p>
        <Link to={article.path}>Read more</Link>
      </div>
    </li>
  );
};

const ArticleList = ({ articles }) => (
  <ul className="article-list">
    {articles.map((article, index) =>
      <ArticleListItem article={article} index={index} key={article.id} />)
    }
  </ul>
);

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    thumbnail: PropTypes.object,
    date: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default ArticleList;
