const theme = require('./theme');

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
        name: `Gunnar Birnir Ólafsson`,
        short_name: `Gunnar`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#60aefb`,
        display: `fullscreen`,
        icon: `assets/icons/gbo-bg.png`,
      },
    },
    `gatsby-plugin-offline`,
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
    `gatsby-plugin-favicon`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-jss',
      options: { theme },
    },
    `gatsby-plugin-scroll-reveal`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-background-image`,
  ],
};
