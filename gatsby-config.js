const autoprefixer = require('autoprefixer');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Les coureurs des boires',
    siteUrl: 'https://www.lescoureursdesboires.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Cousine',
        ],
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/data/articles`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'books',
        path: `${__dirname}/data/books`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sitemap',
    // 'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
  ],
};
