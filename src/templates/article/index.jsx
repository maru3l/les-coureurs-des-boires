import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import RehypeReact from 'rehype-react';
import Helmet from 'react-helmet';

// import Button from '../../components/ui/Button';
import PageTitle from '../../components/PageTitle';

import './style.scss';

const renderAst = new RehypeReact({
  createElement: React.createElement,
}).Compiler;

class Article extends Component {
  constructor(props) {
    super(props);

    this.article = props.data.article;
    this.site = props.data.site;
  }

  getGalleryPictureObject(id) {
    return (id > 0 && id <= this.article.sitePicture.length)
      ? this.article.sitePicture[id - 1]
      : null;
  }

  getHtmlAstPart(partNumber) {
    const htmlAst = { ...this.article.body.childMarkdownRemark.htmlAst };
    const firstPart = htmlAst.children.reduce((acc, cur) =>
      ((acc.filter(el => el.tagName === 'p').length < 2)
        ? [...acc, ...cur]
        : acc), []);

    if (partNumber === 1) {
      htmlAst.children = firstPart;
    } else {
      htmlAst.children = htmlAst.children.slice(firstPart.length);
    }

    return htmlAst;
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{`${this.article.title} | ${this.site.siteMetadata.title}`}</title>
          <meta name="description" content={this.article.description.description} />

          <meta name="twitter:card" value="summary" />

          <meta property="og:title" content={`${this.article.title} | Les coureurs des boires`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://www.lescoureursdesboires.com${this.props.location.pathname}`} />
          <meta property="og:image" content={this.article.hero.ogMeta.src} />
          <meta property="og:description" content={this.article.description.description} />
          <meta property="og:site_name" content="Les coureurs des boires" />

          <link rel="canonical" href={`${this.site.siteMetadata.siteUrl}${this.props.location.pathname}`} />
        </Helmet>

        <PageTitle title={this.article.category} subTitle={this.article.country.name} />
        <div className="article-page">
          <h1 className="article-page__title">{this.article.title}</h1>

          <div className="article-page__part">
            <div className="article-page__part-image article-page__part-image--first">
              <Img
                sizes={this.getGalleryPictureObject(1).sizes}
                alt={this.getGalleryPictureObject(1).description}
              />
            </div>

            <div className="article-page__first-part-text">
              {renderAst(this.getHtmlAstPart(1))}
            </div>
          </div>

          <Img className="article-page__hero" sizes={this.article.hero.sizes} />

          <div className="article-page__part">
            <div className="article-page__second-part-text">
              {renderAst(this.getHtmlAstPart(2))}
            </div>

            <div className="article-page__part-image article-page__part-image--second">
              <Img
                sizes={this.getGalleryPictureObject(2).sizes}
                alt={this.getGalleryPictureObject(2).description}
              />
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export const query = graphql`
  query ArticleTemplate($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    article:contentfulArticle(id: {eq: $id}) {
      title
      category
      body{
        body
        childMarkdownRemark{
          html
          htmlAst
        }
      }
      hero {
        sizes(maxWidth: 1940) {
          ...GatsbyContentfulSizes_withWebp
        }
        ogMeta:resize(width: 1200) {
          src
        }
        description
      }
      sitePicture:gallery {
        sizes(maxWidth: 700) {
          ...GatsbyContentfulSizes_withWebp
        }
        description
      }
      country {
        name
      }
      description {
        description
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
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Article;
