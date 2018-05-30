// vendor
import React, { Component } from 'react';

// vendor components
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import RehypeReact from 'rehype-react';

// utils
import PropTypes from 'prop-types';

// components
import ArticleList from '../../components/ArticleList';
import Gallery from '../../components/Gallery';
import PageTitle from '../../components/PageTitle';

// style
import './style.scss';

const renderAst = new RehypeReact({
  createElement: React.createElement,
}).Compiler;

const galleryArrayConstructor = (gallery = []) =>
  gallery.map(({
    id, title, description, sizes: image,
  }) => ({
    id,
    title,
    description,
    image,
  }));

const createGallery = (gallery = []) => {
  if (gallery === null || gallery.length < 2) return null;

  const galleryList = galleryArrayConstructor(gallery);
  return <Gallery images={galleryList} title="Gallerie" />;
};

const makeArticleList = list =>
  list.map(node => ({
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

class Article extends Component {
  constructor(props) {
    super(props);

    this.article = props.data.article;
    this.site = props.data.site;
  }

  getGalleryItem(position) {
    const { gallery } = this.article;
    return gallery && gallery.length > position ? gallery[position] : null;
  }

  getHtmlAstPart(partNumber) {
    const htmlAst = { ...this.article.body.childMarkdownRemark.htmlAst };
    const firstPart = htmlAst.children.reduce(
      (acc, cur) =>
        (acc.filter(el => el.tagName === 'p').length < 2
          ? [...acc, ...cur]
          : acc),
      [],
    );

    if (partNumber === 1) {
      htmlAst.children = firstPart;
    } else {
      htmlAst.children = htmlAst.children.slice(firstPart.length);
    }

    return htmlAst;
  }

  getSubTitle() {
    return this.article.country ? this.article.country.name : null;
  }

  render() {
    const { gallery = [] } = this.article;

    const {
      firstRelatedArticles,
      secondRelatedArticles,
      thirdRelatedArticles,
    } = this.props.data;

    const relateds = makeArticleList([
      firstRelatedArticles,
      secondRelatedArticles,
      thirdRelatedArticles,
    ]);

    const firstImg = this.getGalleryItem(0);
    const secondImg = this.getGalleryItem(1);

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`${this.article.title} | ${this.site.siteMetadata.title}`}
          </title>
          <meta
            name="description"
            content={this.article.description.description}
          />

          <meta name="twitter:card" value="summary" />

          <meta
            property="og:title"
            content={`${this.article.title} | Les coureurs des boires`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`https://www.lescoureursdesboires.com${
              this.props.location.pathname
            }`}
          />
          <meta property="og:image" content={this.article.hero.ogMeta.src} />
          <meta
            property="og:description"
            content={this.article.description.description}
          />
          <meta property="og:site_name" content="Les coureurs des boires" />

          <link
            rel="canonical"
            href={`${this.site.siteMetadata.siteUrl}${
              this.props.location.pathname
            }`}
          />
        </Helmet>

        <PageTitle
          title={this.article.category}
          subTitle={this.getSubTitle()}
        />
        <div className="article-page">
          <h1 className="article-page__title">{this.article.title}</h1>

          <div className="article-page__part">
            {firstImg && (
              <figure className="article-page__part-image article-page__part-image--first">
                <Img sizes={firstImg.sizes} alt={firstImg.title} />
                <figcaption className="article-page__part-image-caption">
                  {firstImg.description}
                </figcaption>
              </figure>
            )}

            <div className="article-page__first-part-text">
              {renderAst(this.getHtmlAstPart(1))}
            </div>
          </div>

          <Img
            className="article-page__hero"
            sizes={this.article.hero.sizes}
            alt={this.article.hero.title}
          />

          <div className="article-page__part">
            <div className="article-page__second-part-text">
              {renderAst(this.getHtmlAstPart(2))}
            </div>

            {secondImg && (
              <figure className="article-page__part-image article-page__part-image--second">
                <Img sizes={secondImg.sizes} alt={secondImg.title} />
                <figcaption>{secondImg.description}</figcaption>
              </figure>
            )}
          </div>
        </div>

        {createGallery(gallery)}

        <ArticleList articles={relateds} title="Articles liés" />
      </React.Fragment>
    );
  }
}

export const query = graphql`
  query ArticleTemplate(
    $id: String!
    $firstRelatedArticles: String!
    $secondRelatedArticles: String!
    $thirdRelatedArticles: String!
  ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    article: contentfulArticle(id: { eq: $id }) {
      title
      category
      body {
        body
        childMarkdownRemark {
          html
          htmlAst
        }
      }
      hero {
        sizes(maxWidth: 1940, maxHeight: 973, quality: 80) {
          ...GatsbyContentfulSizes_withWebp
        }
        ogMeta: resize(width: 1200) {
          src
        }
        title
      }
      gallery {
        sizes(maxWidth: 1693, quality: 80) {
          ...GatsbyContentfulSizes_withWebp
        }
        title
        description
        id
      }
      country {
        name
      }
      description {
        description
      }
    }
    firstRelatedArticles: contentfulArticle(id: { eq: $firstRelatedArticles }) {
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
    secondRelatedArticles: contentfulArticle(
      id: { eq: $secondRelatedArticles }
    ) {
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
    thirdRelatedArticles: contentfulArticle(id: { eq: $thirdRelatedArticles }) {
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
`;

Article.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    article: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.string,
      body: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
      }),
    }),
    firstRelatedArticles: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      hero: PropTypes.shape({
        sizes: PropTypes.object,
        description: PropTypes.string,
        title: PropTypes.string,
      }),
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
      publicationDate: PropTypes.string,
      fields: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    secondRelatedArticles: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      hero: PropTypes.shape({
        sizes: PropTypes.object,
        description: PropTypes.string,
        title: PropTypes.string,
      }),
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
      publicationDate: PropTypes.string,
      fields: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    thirdRelatedArticles: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      hero: PropTypes.shape({
        sizes: PropTypes.object,
        description: PropTypes.string,
        title: PropTypes.string,
      }),
      description: PropTypes.shape({
        description: PropTypes.string,
      }),
      publicationDate: PropTypes.string,
      fields: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Article;
