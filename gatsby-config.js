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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
  ],
};
