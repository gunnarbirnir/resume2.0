import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';

import SEO, { IProps as SEOProps } from './SEO';
import Navbar from './Navbar';
import Footer from './Footer';
import { spacing, scrollTo } from '../utils';
import { ILocale, IScrollSection, IPersonalInfo } from '../interfaces';
import useWindowSize from '../hooks/useWindowSize';
import useObjectSize from '../hooks/useObjectSize';

interface IProps {
  info: IPersonalInfo | null;
  locale: ILocale;
  seo?: Partial<SEOProps>;
  padding?: boolean;
  pageSections?: IScrollSection[];
  headerSize?: { height: number; width: number };
}

const CONTAINER_ID = 'layout-container';

const useStyles = createUseStyles({
  '@global': {
    h1: { marginBottom: 0 },
    h2: { marginBottom: 0, fontSize: '2rem' },
    h3: { marginBottom: 0, fontSize: '1.5rem' },
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
  info,
  locale,
  seo,
  padding = true,
  pageSections,
  headerSize,
}) => {
  const classes = useStyles();
  const windowSize = useWindowSize();
  const contentRef = useRef(null);
  const contentSize = useObjectSize(contentRef);
  const hideFooter = contentSize.height <= windowSize.height;

  return (
    <div id={CONTAINER_ID} className={classes.container} ref={contentRef}>
      <SEO locale={locale} {...seo} />
      {pageSections && headerSize && (
        <Navbar pageSections={pageSections} headerSize={headerSize} />
      )}
      <div style={{ flex: 1 }} className={cx({ [classes.padding]: padding })}>
        {children}
      </div>
      {!hideFooter && (
        <Footer
          info={info}
          locale={locale}
          scrollToTop={() => scrollTo(CONTAINER_ID)}
        />
      )}
    </div>
  );
};

export default Layout;
