// vendor
import React, { Component } from 'react';

// vendor components
import Helmet from 'react-helmet';

// utils
import PropTypes from 'prop-types';

// components
import ArticleList from '../components/ArticleList';
import FeaturedArticle from '../components/FeaturedArticle';
import HomeHero from '../components/HomeHero';
import ThreeLink from '../components/ThreeLink';

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
    const {
      site: {
        siteMetadata: { siteUrl, title: siteTitle },
      },
    } = this.data;

    return (
      <div>
        <Helmet>
          <title>{`${siteTitle}`}</title>
          <meta
            name="description"
            content="Présentation des bières Coureurs des Boires et d'autres moments de dégustations notables en lien avec les travaux du duo"
          />

          <meta name="twitter:card" value="summary" />

          <meta property="og:title" content="Les coureurs des boires" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${siteUrl}`} />
          {/* <meta property="og:image" content={this.article.hero.ogMeta.src} /> */}
          <meta
            property="og:description"
            content="Présentation des bières Coureurs des Boires et d'autres moments de dégustations notables en lien avec les travaux du duo"
          />
          <meta property="og:site_name" content="Les coureurs des boires" />

          <link rel="canonical" href={`${siteUrl}`} />
        </Helmet>

        <HomeHero background={this.data.background.childImageSharp} />

        <ThreeLink />

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
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allContentfulArticle(
      sort: { order: DESC, fields: [publicationDate] }
      limit: 8
    ) {
      edges {
        node {
          id
          title
          hero {
            sizes(maxWidth: 768, maxHeight: 505, quality: 100) {
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
