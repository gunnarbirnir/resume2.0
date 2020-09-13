import React from 'react';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import smoothscroll from 'smoothscroll-polyfill';

import SEO, { IProps as SEOProps } from './SEO';
import { spacing } from '../utils';
import { ILocale } from '../interfaces';

interface IProps {
  locale: ILocale;
  seo?: Partial<SEOProps>;
  padding?: boolean;
}

smoothscroll.polyfill();

const useStyles = createUseStyles({
  '@global': {
    h1: { marginBottom: 0 },
    h2: { marginBottom: 0, fontSize: '2rem' },
    h3: { marginBottom: 0 },
    h4: { marginBottom: 0 },
    h5: { marginBottom: 0 },
    h6: { marginBottom: 0 },
    p: { marginBottom: 0 },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  padding: {
    padding: spacing(3),
  },
});

const Layout: React.FC<IProps> = ({
  children,
  locale,
  seo,
  padding = true,
}) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.container, { [classes.padding]: padding })}>
      <SEO locale={locale} {...seo} />
      {children}
    </div>
  );
};

export default Layout;
