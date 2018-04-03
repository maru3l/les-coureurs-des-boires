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
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.prismicRepositoryName,
        accessToken: process.env.prismicAccessToken,
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
  ],
};
