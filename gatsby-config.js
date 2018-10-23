const autoprefixer = require('autoprefixer');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Les coureurs des boires',
    description:
      "Présentation des bières Coureurs des Boires et d'autres moments de dégustations notables en lien avec les travaux du duo",
    siteUrl: 'https://www.lescoureursdesboires.com',
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Cousine'],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [autoprefixer()],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/imgs/`,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulArticle } }) =>
              allContentfulArticle.edges.map(edge =>
                Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    date: edge.node.publicationDate,
                    description: edge.node.body.childMarkdownRemark.excerpt,
                    url: site.siteMetadata.siteUrl + edge.node.fields.path,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                  },
                )),
            query: `{
              site {
                siteMetadata {
                  title
                  siteUrl
                }
              }
              allContentfulArticle(sort: { order: DESC, fields: [publicationDate] }) {
                edges {
                  node {
                    title
                    publicationDate
                    body {
                      childMarkdownRemark {
                        excerpt
                      }
                    }
                    fields {
                      path
                    }
                  }
                }
              }
            }`,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-120072921-1',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
  ],
};
