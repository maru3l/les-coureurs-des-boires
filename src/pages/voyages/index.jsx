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
import PageIntro from '../../components/PageIntro';

const formatElementSelectorList = list =>
  list.map(({ slug, name }) => ({ key: slug, value: name }));

class VoyagesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countrySelected:
        this.getSlugFromLocation() || this.getCountries()[0].slug || null,
    };
  }

  getArticlesFormated(slug) {
    return this.getArticleswhitCountrySlug(slug).map(node => ({
      thumbnail: {
        sizes: node.hero.sizes,
        alt: node.hero.title,
      },
      date: node.publicationDate,
      title: node.title,
      excerpt: node.description.description,
      id: node.id,
      path: node.fields.path,
    }));
  }

  getArticleswhitCountrySlug(countrySlug) {
    const {
      articles: { edges: articles },
    } = this.props.data;

    return articles
      .map(({ node: article }) => article)
      .filter(({ country: { slug } }) => slug === countrySlug);
  }

  getCountries() {
    const {
      articles: { edges: articles },
    } = this.props.data;

    return articles.reduce((acc, { node: { country } }) => {
      if (acc.find(({ slug }) => slug === country.slug)) {
        return acc;
      }

      return [...acc, country];
    }, []);
  }

  getSlugFromLocation() {
    const {
      location: { pathname },
    } = this.props;
    const path = pathname.split('/').filter(e => e.length);

    return path[1] ? path[1] : null;
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
          <title>{`Voyages | ${siteTitle}`}</title>
          <meta
            name="description"
            content="Guides de voyages brassicoles dans des cultures traditionnelles de l'Allemagne au Bhoutan, de la Bolivie à la Norvège"
          />

          <meta name="twitter:card" value="summary" />

          <meta
            property="og:title"
            content="Voyages | Les coureurs des boires"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${siteUrl}${pathname}`} />
          {/* <meta property="og:image" content={this.article.hero.ogMeta.src} /> */}
          <meta
            property="og:description"
            content="Guides de voyages brassicoles dans des cultures traditionnelles de l'Allemagne au Bhoutan, de la Bolivie à la Norvège"
          />
          <meta property="og:site_name" content="Les coureurs des boires" />

          <link rel="canonical" href={`${siteUrl}${pathname}`} />
        </Helmet>
        <PageTitle title="Voyages" />
        <PageIntro title="Voyages d'exploration brassicole">
          L&#39;univers de la bière est bien plus vaste que ce que nous croyons.
          Voici quelques-uns de nos voyages de recherche qui nous ouvert
          l&#39;esprit... et l&#39;appétit!
        </PageIntro>
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
    articles: allContentfulArticle(
      sort: { order: DESC, fields: [publicationDate] }
      filter: { category: { eq: "Voyage" } }
    ) {
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
            sizes(maxWidth: 304, maxHeight: 200, quality: 100) {
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
