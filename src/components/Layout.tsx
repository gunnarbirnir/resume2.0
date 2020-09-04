import React from 'react';
import { createUseStyles } from 'react-jss';

import SEO, { IProps as SEOProps } from './SEO';
import { spacing } from '../utils';
import { ILocale } from '../interfaces';

interface IProps {
  locale: ILocale;
  seo?: Partial<SEOProps>;
}

const useStyles = createUseStyles({
  '@global': {
    h1: { marginBottom: 0 },
    h2: { marginBottom: 0 },
    h3: { marginBottom: 0 },
    h4: { marginBottom: 0 },
    h5: { marginBottom: 0 },
    h6: { marginBottom: 0 },
    p: { marginBottom: 0 },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(3),
    minHeight: '100vh',
  },
});

const Layout: React.FC<IProps> = ({ children, locale, seo }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SEO locale={locale} {...seo} />
      {children}
    </div>
  );
};

export default Layout;
