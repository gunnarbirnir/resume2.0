import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { ILocale } from '../interfaces';
import { getShortLocale } from '../utils';

interface IProps {
  title?: string;
  description?: string;
  locale: ILocale;
}

const SEO: React.FC<IProps> = ({ title, description, locale }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      title={metaTitle}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : undefined}
      htmlAttributes={{ lang: getShortLocale(locale) }}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]}
    />
  );
};

export default SEO;
