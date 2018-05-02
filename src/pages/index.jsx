import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HomeHero from '../components/HomeHero';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleList from '../components/ArticleList';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    const { data } = props;
    this.data = data;

    this.state = {
      articles: data.allContentfulArticle.edges,
    };
  }
  getArticles() {
    return this.state.articles
      .map(({ node }) => ({
        thumbnail: {
          sizes: node.hero.sizes,
          alt: node.hero.title,
        },
        date: node.publicationDate,
        title: node.title,
        excerpt: node.description.description,
        id: node.id,
        path: node.fields.path,
      }))
      .slice(2);
  }

  getFeaturedArticles() {
    return this.state.articles
      .map(({ node }) => ({
        thumbnail: {
          sizes: node.hero.sizes,
          alt: node.hero.title,
        },
        date: node.publicationDate,
        title: node.title,
        excerpt: node.description.description,
        id: node.id,
        path: node.fields.path,
      }))
      .slice(0, 2);
  }

  render() {
    return (
      <div>
        <HomeHero background={this.data.background.childImageSharp} />
        <div>
          {this.getFeaturedArticles().map(article => (
            <FeaturedArticle article={article} key={article.id} />
          ))}
        </div>
        <ArticleList articles={this.getArticles()} title="Articles" />
      </div>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    allContentfulArticle(
      sort: { order: DESC, fields: [publicationDate] }
      limit: 8
    ) {
      edges {
        node {
          id
          title
          hero {
            sizes(maxWidth: 304) {
              ...GatsbyContentfulSizes_withWebp
            }
            description
            title
          }
          description {
            description
          }
          publicationDate(formatString: "DD/MM/YYYY")
          fields {
            path
          }
        }
      }
    }
    background: file(name: { eq: "MG_4563B" }) {
      childImageSharp {
        sizes(quality: 100, jpegProgressive: true) {
          ...GatsbyImageSharpSizes_withWebp
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
