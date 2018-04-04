const autoprefixer = require('autoprefixer');

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
    'gatsby-transformer-remark',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
  ],
};
