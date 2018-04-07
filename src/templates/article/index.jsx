import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

// import Button from '../../components/ui/Button';
import PageTitle from '../../components/PageTitle';

import './style.scss';

const Article = ({ data }) => {
  const article = data.contentfulArticle;

  const paragraphs = article.body.body.split('\n').filter(el => el !== '');

  const partOne = `<p>${paragraphs.slice(0, 2).join('</p>\n<p>')}</p>`;
  const partTwo = `<p>${paragraphs.slice(2).join('</p>\n<p>')}</p>`;

  const imageOne = article.gallery[0];
  const imageTwo = article.gallery[1];

  return (
    <React.Fragment>
      <PageTitle title={article.category} subTitle={article.country.name} />
      <div className="article-page">
        <div className="article-page__part article-page__part--first">
          <h1>{article.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: partOne }} />

          <Img sizes={imageOne.sizes} alt={imageOne.description} />
        </div>

        <Img sizes={article.hero.sizes} />

        <div className="article-page__part article-page__part--second">
          <div dangerouslySetInnerHTML={{ __html: partTwo }} />
          <Img sizes={imageTwo.sizes} alt={imageTwo.description} />
        </div>
      </div>
    </React.Fragment>
  );
};
// <Img className="article-page__hero" />

export const query = graphql`
  query ArticleTemplate($id: String!) {
    contentfulArticle(id: {eq: $id}) {
      title
      category
      body{
        body
        childMarkdownRemark{
          html
        }
      }
      hero {
        sizes(maxWidth: 1940) {
          ...GatsbyContentfulSizes_withWebp
        }
        description
      }
      gallery {
        id
        sizes {
          ...GatsbyContentfulSizes_withWebp
        }
        description
      }
      country {
        name
      }
    }
  }
`;

Article.propTypes = {
  data: PropTypes.shape({
    contentfulArticle: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.string,
      body: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};

export default Article;
