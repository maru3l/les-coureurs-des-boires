import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ArticleList from '../components/ArticleList';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      articles: data.allContentfulArticle.edges,
    };
  }
  getArticles() {
    return this.state.articles.map(({ node }) => ({
      thumbnail: {
        sizes: node.hero.sizes,
        alt: node.hero.description,
      },
      date: node.createdAt,
      title: node.title,
      excerpt: node.description.description,
      id: node.id,
      path: node.fields.path,
    }));
  }

  render() {
    return (
      <div>
        <div style={{ height: '60vh', backgroundColor: 'white' }} />
        <h1>Les coureurs des boires</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia illum
          nemo consectetur, dolor dicta expedita quos similique, tempore eaque
          laboriosam tenetur veniam aperiam nisi eligendi fugit eum omnis blanditiis ex.
        </p>
        <ArticleList articles={this.getArticles()} />
      </div>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    allContentfulArticle(sort: {order: DESC, fields: [createdAt]}) {
      edges {
        node {
          id
          title
          hero {
            sizes(maxWidth: 304) {
              ...GatsbyContentfulSizes_withWebp
            }
            description
          }
          description
          publicationDate(formatString: "DD/MM/YYYY")
          fields {
            path
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default IndexPage;
