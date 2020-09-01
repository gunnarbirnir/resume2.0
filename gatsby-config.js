require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: `Gunnar Birnir Ólafsson`,
    description: `Gunnar Birnir Ólafsson, web developer from Iceland`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `icons`,
        path: `${__dirname}/assets/icons`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0f4c81`,
        icon: `assets/icons/gbo.png`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-internationalization`,
      options: {
        locales: ['is', 'en'],
        defaultLocale: 'is',
      },
    },
  ],
};
