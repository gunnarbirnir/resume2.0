import React from 'react';
import { createUseStyles } from 'react-jss';

import SEO, { IProps as SEOProps } from './SEO';
import { spacing } from '../utils';

interface IProps {
  seo: SEOProps;
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
    margin: spacing(3),
    minHeight: `calc(100vh - ${spacing(6)})`,
  },
});

const Layout: React.FC<IProps> = ({ children, seo }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SEO {...seo} />
      {children}
    </div>
  );
};

export default Layout;
