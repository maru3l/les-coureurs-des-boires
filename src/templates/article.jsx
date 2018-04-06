import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';

const Article = ({ data }) => {
  const article = data.contentfulArticle;
  return (
    <React.Fragment>
      <PageTitle title={article.category} />
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body.childMarkdownRemark.html }} />
    </React.Fragment>
  );
};

export const query = graphql`
  query ArticleTemplate($id: String!) {
    contentfulArticle(id: {eq: $id}) {
      title
      category
      body{
        childMarkdownRemark{
          html
        }
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
