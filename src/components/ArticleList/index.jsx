import React from 'react';
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
        <p className="article-list__item-date">Publié 12/05/2017</p>
        <h3 className="article-list__item-title">{article.title}</h3>
        <p className="article-list__item-text">{article.content}</p>
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

export default ArticleList;
