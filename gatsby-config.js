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
        icon: `assets/icons/gbo.png`,
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
  ],
};
