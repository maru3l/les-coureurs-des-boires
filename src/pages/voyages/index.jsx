// vendor
import React, { Component } from 'react';

// vendor components
import Helmet from 'react-helmet';

// utils
import PropTypes from 'prop-types';

// components
import ArticleList from '../../components/ArticleList';
import ElementSelector from '../../components/ElementSelector';
import PageTitle from '../../components/PageTitle';

import './style.scss';

const formatElementSelectorList = list => (
  list.map(({ slug, name }) => ({ key: slug, value: name }))
);

class VoyagesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countrySelected: this.getSlugFromLocation() || this.getCountries()[0].slug || null,
    };
  }

  getArticlesFormated(slug) {
    return this.getArticleswhitCountrySlug(slug).map(node => ({
      thumbnail: {
        sizes: node.hero.sizes,
        alt: node.hero.description,
      },
      date: node.publicationDate,
      title: node.title,
      excerpt: node.description.description,
      id: node.id,
      path: node.fields.path,
    }));
  }

  getArticleswhitCountrySlug(countrySlug) {
    const { articles: { edges: articles } } = this.props.data;

    return articles
      .map(({ node: article }) => article)
      .filter(({ country: { slug } }) => slug === countrySlug);
  }

  getCountries() {
    const { articles: { edges: articles } } = this.props.data;

    return articles.reduce((acc, { node: { country } }) => {
      if (acc.find(({ slug }) => slug === country.slug)) {
        return acc;
      }

      return [...acc, country];
    }, []);
  }

  getSlugFromLocation() {
    const { location: { pathname } } = this.props;
    const path = pathname.split('/').filter(e => e.length);

    return path[1]
      ? path[1]
      : null;
  }

  handleClick(slug) {
    window.history.pushState({}, '', `/voyages/${slug}/`);

    this.setState({ countrySelected: slug });
  }

  render() {
    const { countrySelected } = this.state;
    const coutriesList = this.getCountries();
    const articles = this.getArticlesFormated(countrySelected);
    const { siteUrl, title: siteTitle } = this.props.data.site.siteMetadata;
    const { pathname } = this.props.location;

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`Voyages | ${siteTitle}`}
          </title>
          {/* }<meta
            name="description"
            content={this.article.description.description}
          /> */}

          <meta name="twitter:card" value="summary" />

          <meta
            property="og:title"
            content="Voyages | Les coureurs des boires"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${siteUrl}${pathname}`}
          />
          {/* <meta property="og:image" content={this.article.hero.ogMeta.src} /> */}
          {/* <meta
            property="og:description"
            content={this.article.description.description}
          /> */}
          <meta property="og:site_name" content="Les coureurs des boires" />

          <link
            rel="canonical"
            href={`${siteUrl}${pathname}`}
          />
        </Helmet>
        <PageTitle title="Voyages" />

        <div className="voyages-page">
          <h1 className="voyages-page__title">Titre de la page avec le mot voyage.</h1>

          <p className="voyages-page__intro-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
            itaque adipisci quos officia ex dolore est, reprehenderit excepturi,
            inventore deserunt. Praesentium pariatur repellendus consequatur minima eius
            repudiandae recusandae, error quam?
          </p>
        </div>

        <ElementSelector
          title="Liste de pays"
          elements={formatElementSelectorList(coutriesList)}
          elementClicked={e => this.handleClick(e)}
          elementSelected={countrySelected}
        />

        <ArticleList articles={articles} title="Articles liés" />
      </React.Fragment>
    );
  }
}

export const query = graphql`
  query VoyagesQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    articles:allContentfulArticle(sort: {order: DESC, fields: [publicationDate]}, filter: {category: {eq: "Voyage"}}) {
      edges {
        node {
          id
          country {
            id
            name
            slug
          }
          title
          hero {
            sizes(maxWidth: 304) {
              ...GatsbyContentfulSizes_withWebp
            }
            description
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
  }
`;

VoyagesPage.propTypes = {
  data: PropTypes.shape({
    articles: PropTypes.shape({
      edges: PropTypes.array,
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default VoyagesPage;
