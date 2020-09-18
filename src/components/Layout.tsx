import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';

import SEO, { IProps as SEOProps } from './SEO';
import Navbar from './Navbar';
import Footer from './Footer';
import { spacing, scrollTo } from '../utils';
import { ILocale, IScrollSection } from '../interfaces';
import useWindowSize from '../hooks/useWindowSize';
import useObjectSize from '../hooks/useObjectSize';

interface IProps {
  locale: ILocale;
  seo?: Partial<SEOProps>;
  padding?: boolean;
  pageSections?: IScrollSection[];
}

const CONTAINER_ID = 'layout-container';

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
  pageSections,
}) => {
  const classes = useStyles();
  const windowSize = useWindowSize();
  const contentRef = useRef(null);
  const contentSize = useObjectSize(contentRef);
  const hideFooter = contentSize.height <= windowSize.height;

  return (
    <div id={CONTAINER_ID} className={classes.container} ref={contentRef}>
      <SEO locale={locale} {...seo} />
      {pageSections && <Navbar locale={locale} pageSections={pageSections} />}
      <div style={{ flex: 1 }} className={cx({ [classes.padding]: padding })}>
        {children}
      </div>
      {!hideFooter && (
        <Footer locale={locale} scrollToTop={() => scrollTo(CONTAINER_ID)} />
      )}
    </div>
  );
};

export default Layout;
