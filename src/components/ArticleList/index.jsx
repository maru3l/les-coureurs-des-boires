import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
      </div>
    </li>
  );
};

const ArticleList = ({ articles }) => (
  <ul className="article-list">
    {articles.map((article, index) =>
      <ArticleListItem article={article} index={index} />)
    }
  </ul>
);

ArticleListItem.propTypes = {
  article: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

ArticleList.propTypes = {
  articles: PropTypes.func.isRequired,
};


export default ArticleList;
